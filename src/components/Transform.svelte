<script lang="ts">
    import _ from "lodash";
    import { parse } from "papaparse";

    export let data;
    export let summary;
    export let separator;
    let range;

    export let options;

    const parseNumeric = (input) => {
        const output = parseFloat(input);
        if (isNaN(output)) return;
        return output;
    };

    const convert = (input) => {
        console.log('p',parse(input, { dynamicTyping: true }))
        return parse(input, { dynamicTyping: true }).data;
    };

    /** Sets the new window for the data based on the zoom or scroll event */
    export const scrollAndZoomHandler = function (state) {
        console.log("scrollAndZoomHandler", state);
        return function (chartContext, { xaxis }) {
            console.log("scrollAndZoomHandler->", chartContext, { xaxis });
            if (xaxis && state && state.options) {
                state.options = {
                    ...state.options,
                    xaxis: {
                        ...state.options.xaxis,
                        min: xaxis.min,
                        max: xaxis.max,
                    },
                };
            }
        };
    };

    export const summarize = () => {
        const dataset = convert(data);

        const headers = dataset[0];
        const transposed = _.zip.apply(_, dataset.splice(1));
        const pairs = _.zip(headers, transposed);
        const series = pairs
            .map(([name, data]) => ({ name, data }))
        //    .filter((x) => _.includes(["Ax", "Ay", "Az"], x.name));
        const yaxis = series.map((x) => ({
            show: false,
            seriesName: x.name,
            opposite: true,
        }));

        summary = {
            lines: dataset.length - 1,
            headers,
            options,
        };

        options = {
            yaxis,
            series,
            stroke: {
                curve: "straight",
                width: 1,
            },
            chart: {
                animations: {
                    enabled: false,
                },
                type: "line",
                toolbar: {
                    show: true,
                    offsetX: 0,
                    offsetY: 0,
                    tools: {
                        download: true,
                        selection: true,
                        zoom: true,
                        zoomin: false,
                        zoomout: false,
                        pan: true,
                        reset: true,
                    },
                    autoSelected: "selection",
                },
                selection: {
                    enabled: true,
                    type: "x",
                    fill: {
                        color: "#222",
                        opacity: 0.1,
                    },
                    stroke: {
                        width: 1,
                        dashArray: 3,
                        color: "#000",
                        opacity: 0.4,
                    },
                },
                zoom: {
                    enabled: true,
                    type: "x",
                },
                events: {
                    selection: function (chartContext, { xaxis, yaxis }) {
                        console.log("selection", chartContext, {
                            xaxis,
                            yaxis,
                        });
                        if (!yaxis) return;
                        range = xaxis;
                    },
                    zoomed: scrollAndZoomHandler(),
                    scrolled: scrollAndZoomHandler(),
                },
            },
            tolltip: {
                enabled: false,
            },
            annotations: {
                xaxis: [
                    {
                        x: 10,
                        x2: 30,
                        borderColor: "#00E396",
                        label: {
                            borderColor: "#00E396",
                            style: {
                                fontSize: "12px",
                                color: "#fff",
                                background: "#00E396",
                            },
                            orientation: "vertical",
                            offsetY: 7,
                            text: "Annotation Text",
                        },
                    },
                ],
            },
            xaxis: {
                type: "numeric",
            },
        };
        console.log(options);
    };
    if (data) summarize();
    let selected;
    let separators = [
        { label: "tab", value: "\t" },
        { label: "comma", value: "," },
        { label: "semicolon", value: ";" },
    ];
</script>

{#if range}
    [{Math.round(range?.min)}, {Math.round(range?.max)}] = {Math.round(
        range?.max - range?.min
    )}
{/if}

<!-- svelte-ignore a11y-no-onchange -->
<select
    class="p-2 border border-gray-300 rounded-lg antialiased"
    value={separator}
    on:change={(e) => {
        separator = e.target.value;
        summarize();
    }}
>
    {#each separators as sep}
        <option value={sep.value}>
            {sep.label}
        </option>
    {/each}
</select>
