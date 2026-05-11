const data = window.BRAND_TRACKER_DATA;

const state = {
  tab: "awareness",
  metric: "unaided",
  equity: "associations",
  channel: "initialAwareness"
};

const fmt = (value, digits = 0) => {
  if (value === null || value === undefined || Number.isNaN(value)) return "Not confirmed";
  return `${Number(value).toFixed(digits)}%`;
};

const quarterLabel = (quarter) => quarter.replace(/20(\d{2})$/, "'$1");

const byBrand = Object.fromEntries(data.brands.map((brand) => [brand.key, brand]));

function latestWithValue(series, brand) {
  return [...series].reverse().find((row) => row.values[brand] !== null && row.values[brand] !== undefined);
}

function closestDominant(row) {
  const spanx = row.values.Spanx;
  const skims = row.values.Skims;
  if (spanx === null || skims === null) return null;
  return spanx >= skims ? { brand: "Spanx", value: spanx } : { brand: "Skims", value: skims };
}

function renderSummaryCards() {
  const unaidedLatest = latestWithValue(data.awareness.unaided, "Shapermint");
  const aidedLatest = latestWithValue(data.awareness.aided, "Shapermint");
  const dominant = closestDominant(unaidedLatest);
  const gap = dominant.value - unaidedLatest.values.Shapermint;
  const q3Unaided = data.awareness.unaided.find((row) => row.quarter === "Q3 2025");
  const q1Unaided = data.awareness.unaided.find((row) => row.quarter === "Q1 2026");
  const recovery = q1Unaided.values.Shapermint - q3Unaided.values.Shapermint;

  const cards = [
    {
      label: "Latest Shapermint unaided",
      value: fmt(unaidedLatest.values.Shapermint),
      note: `${unaidedLatest.quarter}, verified from deck card`
    },
    {
      label: `Gap to ${dominant.brand}`,
      value: `${gap.toFixed(0)}pp`,
      note: `${fmt(unaidedLatest.values.Shapermint)} vs ${fmt(dominant.value)} unaided`
    },
    {
      label: "Latest Shapermint aided",
      value: fmt(aidedLatest.values.Shapermint, 1),
      note: `${aidedLatest.quarter}, lowest among tracked brands`
    },
    {
      label: "Recovery since Q3",
      value: `+${recovery.toFixed(0)}pp`,
      note: "Unaided awareness rebounded, but remains structurally low"
    }
  ];

  document.getElementById("summaryCards").innerHTML = cards
    .map((card) => `
      <article class="summary-card">
        <div class="label-row">
          <h3>${card.label}</h3>
          <span class="dot" style="background:${byBrand.Shapermint.color}"></span>
        </div>
        <strong>${card.value}</strong>
        <span>${card.note}</span>
      </article>
    `)
    .join("");

  document.getElementById("unaidedGap").textContent = `${gap.toFixed(0)}pp`;
}

function renderLegend() {
  document.getElementById("brandLegend").innerHTML = data.brands
    .map((brand) => `
      <span class="legend-item">
        <span class="dot" style="background:${brand.color}"></span>
        ${brand.label}
      </span>
    `)
    .join("");
}

function renderAwarenessChart() {
  const series = data.awareness[state.metric];
  const svg = document.getElementById("awarenessChart");
  const title = state.metric === "unaided" ? "Unaided awareness" : "Aided awareness";
  document.getElementById("awarenessTitle").textContent = title;
  document.getElementById("awarenessSourceNote").textContent = data.awarenessNotes[state.metric];

  const width = svg.clientWidth || 1180;
  const height = 430;
  const margin = { top: 30, right: 28, bottom: 78, left: 52 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const allValues = series.flatMap((row) => Object.values(row.values).filter((value) => value !== null));
  const maxValue = Math.ceil(Math.max(...allValues, state.metric === "aided" ? 100 : 45) / 10) * 10;
  const yTicks = state.metric === "aided" ? [40, 50, 60, 70, 80, 90, 100] : [0, 10, 20, 30, 40, 50];
  const xFor = (index) => margin.left + (innerWidth * index) / Math.max(series.length - 1, 1);
  const yFor = (value) => margin.top + innerHeight - (value / maxValue) * innerHeight;

  const grid = yTicks
    .filter((tick) => tick <= maxValue)
    .map((tick) => {
      const y = yFor(tick);
      return `
        <line class="grid-line" x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}"></line>
        <text class="axis-label" x="${margin.left - 12}" y="${y + 4}" text-anchor="end">${tick}%</text>
      `;
    })
    .join("");

  const xLabels = series
    .map((row, index) => {
      const showLabel = series.length <= 12 || index % 2 === 0 || index === series.length - 1 || row.confidence === "missing-exact";
      return `
        <line class="x-tick" x1="${xFor(index)}" y1="${height - margin.bottom}" x2="${xFor(index)}" y2="${height - margin.bottom + 6}"></line>
        ${showLabel ? `<text class="axis-label axis-label-x" x="${xFor(index)}" y="${height - 30}" text-anchor="end" transform="rotate(-42 ${xFor(index)} ${height - 30})">${quarterLabel(row.quarter)}</text>` : ""}
      `;
    })
    .join("");

  const brandLines = data.brands
    .map((brand) => {
      const rawPoints = series.map((row, index) => ({ row, index, value: row.values[brand.key] }));
      const segments = [];
      let activeSegment = [];
      rawPoints.forEach((point) => {
        if (point.value === null || point.value === undefined) {
          if (activeSegment.length) segments.push(activeSegment);
          activeSegment = [];
          return;
        }
        activeSegment.push(point);
      });
      if (activeSegment.length) segments.push(activeSegment);
      const paths = segments
        .filter((segment) => segment.length > 1)
        .map((segment) => {
          const path = segment
            .map((point, index) => `${index === 0 ? "M" : "L"} ${xFor(point.index)} ${yFor(point.value)}`)
            .join(" ");
          return `<path class="series-line" d="${path}" stroke="${brand.color}"></path>`;
        })
        .join("");
      const points = rawPoints.filter((point) => point.value !== null && point.value !== undefined);
      const circles = points
        .map((point) => `
          <circle class="series-point" cx="${xFor(point.index)}" cy="${yFor(point.value)}" r="${brand.key === "Shapermint" ? 6 : 5}" fill="${brand.color}" data-brand="${brand.key}" data-quarter="${point.row.quarter}" data-value="${point.value}" data-source="${point.row.source}" data-confidence="${point.row.confidence}"></circle>
        `)
        .join("");
      return `
        ${paths}
        ${circles}
      `;
    })
    .join("");

  const missingMarkers = state.metric === "unaided"
    ? series
        .map((row, index) => ({ row, index }))
        .filter((point) => point.row.confidence === "missing-exact")
        .map((point) => `
          <g>
            <line x1="${xFor(point.index)}" y1="${margin.top}" x2="${xFor(point.index)}" y2="${height - margin.bottom}" stroke="var(--line-strong)" stroke-dasharray="4 6"></line>
            <text class="axis-label" x="${xFor(point.index)}" y="${margin.top - 8}" text-anchor="middle">Exact values missing</text>
          </g>
        `)
        .join("")
    : "";

  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.innerHTML = `${grid}${xLabels}${missingMarkers}${brandLines}`;
  attachChartTooltips();
}

function attachChartTooltips() {
  const tooltip = document.getElementById("chartTooltip");
  document.querySelectorAll(".series-point").forEach((point) => {
    point.addEventListener("mouseenter", (event) => {
      const target = event.currentTarget;
      tooltip.innerHTML = `<strong>${target.dataset.brand} - ${target.dataset.quarter}</strong><br>${fmt(target.dataset.value, state.metric === "aided" ? 1 : 0)}<br><span>${target.dataset.source}</span>`;
      tooltip.style.display = "block";
    });
    point.addEventListener("mousemove", (event) => {
      const wrap = document.querySelector(".chart-wrap").getBoundingClientRect();
      tooltip.style.left = `${event.clientX - wrap.left + 14}px`;
      tooltip.style.top = `${event.clientY - wrap.top - 12}px`;
    });
    point.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });
  });
}

function renderActions() {
  document.getElementById("actionCards").innerHTML = data.actions
    .map((action) => `
      <article class="action-card">
        <span class="urgency">${action.urgency}</span>
        <h3>${action.title}</h3>
        <p>${action.proof}</p>
        <p><strong>Move:</strong> ${action.move}</p>
      </article>
    `)
    .join("");
}

function heatColor(value, max) {
  const ratio = Math.max(0.08, Math.min(value / max, 1));
  return `color-mix(in oklch, var(--accent) ${Math.round(ratio * 55)}%, var(--surface) 45%)`;
}

function rowLeader(row, period = "q1") {
  const values = row[period] || row.values;
  return Object.entries(values).sort((a, b) => b[1] - a[1])[0];
}

function renderEquity() {
  const equity = data.equity[state.equity];
  const table = document.getElementById("equityTable");
  document.getElementById("equityTitle").textContent = equity.title;

  const isCompare = Boolean(equity.rows[0].q1);
  const max = Math.max(
    ...equity.rows.flatMap((row) => {
      const values = isCompare ? Object.values(row.q1) : Object.values(row.values);
      return values.filter((value) => value !== null);
    })
  );
  const brands = data.brands.map((brand) => brand.key);

  const bodyRows = equity.rows
    .map((row) => {
      const values = isCompare ? row.q1 : row.values;
      return `
        <tr>
          <td>${row.statement}</td>
          ${brands.map((brand) => {
            const value = values[brand];
            const q4 = isCompare ? row.q4[brand] : null;
            const delta = isCompare ? value - q4 : null;
            return `
              <td>
                <div class="heat-cell" style="background:${heatColor(value, max)}">
                  ${fmt(value, value % 1 ? 1 : 0)}
                  ${isCompare ? `<span class="heat-delta">${delta >= 0 ? "+" : ""}${delta.toFixed(1)}pp vs Q4</span>` : ""}
                </div>
              </td>
            `;
          }).join("")}
        </tr>
      `;
    })
    .join("");

  table.innerHTML = `
    <thead>
      <tr>
        <th>Statement</th>
        ${brands.map((brand) => `<th>${brand}</th>`).join("")}
      </tr>
    </thead>
    <tbody>${bodyRows}</tbody>
  `;

  const leaders = equity.rows.map((row) => rowLeader(row, isCompare ? "q1" : "values"));
  const shapermintWins = leaders.filter(([brand]) => brand === "Shapermint").length;
  const avgShapermint = equity.rows.reduce((sum, row) => sum + (isCompare ? row.q1.Shapermint : row.values.Shapermint), 0) / equity.rows.length;
  const spanxWins = leaders.filter(([brand]) => brand === "Spanx").length;
  document.getElementById("equitySummary").innerHTML = `
    <div class="mini-read"><strong>${shapermintWins} of ${equity.rows.length}</strong><span>Statements led by Shapermint in this view.</span></div>
    <div class="mini-read"><strong>${fmt(avgShapermint, 1)}</strong><span>Average Shapermint ownership across listed statements.</span></div>
    <div class="mini-read"><strong>${spanxWins} Spanx leads</strong><span>Spanx remains the clearest owner across the selected equity set.</span></div>
  `;
}

function renderSignals() {
  document.getElementById("signalGrid").innerHTML = data.shapermintSignals
    .map((signal) => `
      <article class="signal-card">
        <h3>${signal.label}</h3>
        <strong>${fmt(signal.q1, 1)}</strong>
        <p><span class="delta">${signal.delta.toFixed(1)}pp</span> vs Q4. ${signal.read}</p>
      </article>
    `)
    .join("");
}

function renderChannels() {
  const channelData = data.channels[state.channel];
  const max = Math.max(...channelData.rows.flatMap((row) => row.values.filter((value) => value !== null)));
  const quarterLabels = channelData.quarters.map(quarterLabel);
  document.getElementById("channelSourceNote").textContent = `${channelData.source}. Bars run left to right: ${quarterLabels.join(", ")}.`;
  document.getElementById("channelList").innerHTML = `
    <div class="channel-axis" aria-hidden="true">
      <span>Channel</span>
      <div class="channel-quarter-labels">
        ${quarterLabels.map((quarter) => `<span>${quarter}</span>`).join("")}
      </div>
      <span>Latest</span>
    </div>
    ${channelData.rows
    .map((row) => {
      const latest = [...row.values].reverse().find((value) => value !== null);
      return `
        <div class="channel-row">
          <div class="channel-name">${row.channel}</div>
          <div class="spark" aria-label="${row.channel} trend">
            ${row.values.map((value, index) => `
              <span class="spark-slot">
                <span class="spark-value">${value === null ? "n/a" : fmt(value, 1)}</span>
                <span class="spark-bar" title="${channelData.quarters[index]}: ${value === null ? "Not asked" : fmt(value, 1)}" style="height:${value === null ? 4 : Math.max(4, (value / max) * 44)}px; opacity:${value === null ? 0.25 : 1}"></span>
                <span class="spark-quarter">${quarterLabel(channelData.quarters[index])}</span>
              </span>
            `).join("")}
          </div>
          <div class="channel-latest">${fmt(latest, 1)}</div>
        </div>
      `;
    })
    .join("")}
  `;
}

function renderNotes() {
  document.getElementById("dataNotes").innerHTML = data.dataNotes
    .map((note) => `<li>${note}</li>`)
    .join("");
}

function bindInteractions() {
  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      state.tab = button.dataset.tab;
      document.querySelectorAll(".tab").forEach((item) => item.classList.toggle("is-active", item === button));
      document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.toggle("is-active", panel.id === state.tab));
    });
  });

  document.querySelectorAll("[data-metric]").forEach((button) => {
    button.addEventListener("click", () => {
      state.metric = button.dataset.metric;
      document.querySelectorAll("[data-metric]").forEach((item) => item.classList.toggle("is-active", item === button));
      renderAwarenessChart();
    });
  });

  document.querySelectorAll("[data-equity]").forEach((button) => {
    button.addEventListener("click", () => {
      state.equity = button.dataset.equity;
      document.querySelectorAll("[data-equity]").forEach((item) => item.classList.toggle("is-active", item === button));
      renderEquity();
    });
  });

  document.querySelectorAll("[data-channel]").forEach((button) => {
    button.addEventListener("click", () => {
      state.channel = button.dataset.channel;
      document.querySelectorAll("[data-channel]").forEach((item) => item.classList.toggle("is-active", item === button));
      renderChannels();
    });
  });

  window.addEventListener("resize", renderAwarenessChart);
}

function init() {
  renderSummaryCards();
  renderLegend();
  renderAwarenessChart();
  renderActions();
  renderEquity();
  renderSignals();
  renderChannels();
  renderNotes();
  bindInteractions();
}

init();
