export const getOptions = ({ hidden, selection, annotations }) => ({
    stroke: {
        curve: "straight",
        width: 1,
    },
    chart: {
        height: '400px',
        animations: {
            enabled: false,
        },
        type: "line",
        toolbar: {
            show: hidden,
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
            enabled: hidden,
            type: "x",
        },
        events: {
            selection: selection,
        },
    },
    grid: {
        show: hidden,
    },
    tooltip: {
        enabled: true,
        fixed: {
            enabled: true,
            position: 'topLeft',
            offsetX: 0,
            offsetY: 35,
        },
    },
    annotations: {
        xaxis: annotations,
    },
    legend: {
        show: true,
        showForSingleSeries: false,
        showForNullSeries: true,
        showForZeroSeries: true,
        position: 'top',
        horizontalAlign: 'right',
        floating: false,
        fontSize: '26px',
        fontFamily: 'Helvetica, Arial',
        fontWeight: 400,
        labels: {
            colors: undefined,
            useSeriesColors: true
        },
        itemMargin: {
            horizontal: 10,
            vertical: 2
        },
    },
    xaxis: {
        type: "numeric",
        axisBorder: {
            show: hidden,
            color: '#78909C',
            height: 1,
            width: '100%',
            offsetX: 0,
            offsetY: 0
        },
    },
})