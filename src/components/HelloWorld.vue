<template>
  <div class="hello">
    <textarea
      :value="input"
      rows="5"
      cols="80"
      @change="x => read(x.target.value)"
      :placeholder="example"
    ></textarea>
    <textarea v-model="labelsInput" rows="5" cols="80"></textarea>
    <br />
    <select v-model="columnsInput" multiple>
      <option disabled value="0">Please select one</option>
      <option v-for="column in headers" :key="column" v-bind:value="column">{{
        column
      }}</option>
    </select>
    <select v-model="selectedLabel">
      <option disabled value="0">Please select one</option>
      <option v-for="label in labels" :key="label" v-bind:value="label">{{
        label
      }}</option>
    </select>
    <button @click="annotateData">annotate</button>
    <div>
      <apexchart
        ref="demoChart"
        :options="selection"
        height="300"
        :series="series.filter(x => contains(x.name))"
      ></apexchart>
    </div>

    <h2>Output</h2>
    <pre>{{ output }}</pre>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

import _ from "lodash";
const LABEL = "label";

export default {
  name: "Annotations",
  props: {
    msg: String
  },
  methods: {
    ...mapActions("csv", ["read", "write"]),
    ...mapActions("annotation", [
      "select",
      "renderAnnotations",
      "selectColumns",
      "convert"
    ]),
    contains: function(s) {
      return _.includes(this.columns, s);
    },
    annotateData: function() {
      for (var i = this.range.from; i < this.range.to; i++) {
        this.data2[this.headers.indexOf(LABEL)][i] = this.selectedLabel;
      }
      var data = _.unzip(this.data2);
      this.write(data);
      this.renderAnnotations({
        data2: this.data2,
        headers: this.headers,
        labels: this.labels
      });
    }
  },
  computed: {
    ...mapGetters("annotation", {
      options: "getOptions"
    }),
    ...mapState("csv", ["output", "input", "data", "headers", "example"]),
    ...mapState("annotation", {
      colors: "colors",
      range: "range",
      columns: "columns",
      chartData: "data"
    }),

    selection: function() {
      return this.options(this.select, this.zoom);
    },
    columnsInput: {
      get: function() {
        return this.columns;
      },
      set: function(x) {
        this.selectColumns(x);
      }
    },
    data2: function() {
      this.convert({
        payload: this.data,
        labels: this.labelsInput.split("\n"),
        headers: this.headers
      });
      return this.chartData;
    },
    series: function() {
      var data = this.data2;
      return this.headers.map((x, i) => {
        return { name: x, data: data[i] };
      });
    },
    labels: function() {
      return this.labelsInput.split("\n");
    }
  },
  data: function() {
    return {
      labelsInput: "unknown\nrest\nswing up\nswing down\nswitch hand",
      selectedLabel: 0
    };
  }
};
</script>
