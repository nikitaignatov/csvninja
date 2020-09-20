<template>
  <div class="hello">
    <v-textarea
      label="Csv Data"
      rows="8"
      cols="120"
      :value="input||sample"
      @change="x => read(x)"
      :placeholder="example"
    ></v-textarea>
    <v-textarea v-model="labelsInput" label="labels" rows="5" cols="80"></v-textarea>
    <br />

    <v-combobox v-model="columnsInput" :items="headers" multiple outlined label="Data Columns"></v-combobox>

    <div>
      <apexchart
        ref="demoChart"
        :options="selection"
        height="300"
        :series="series.filter(x => contains(x.name))"
      ></apexchart>
    </div>

    <v-combobox v-model="selectedLabel" :items="labels" outlined label="Active Label"></v-combobox>
    <v-btn large color="primary" @click="annotateData">Annotate</v-btn>
    <h2 class="text-h2">Output</h2>
    <v-textarea
      label="Csv Data"
      rows="8"
      cols="120"
      :value="output"
      placeholder="Annotations are not defined"
    ></v-textarea>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { ACCELEROMETER } from "@/samples";

import _ from "lodash";
const LABEL = "label";

const samples = {
  accelerometer: ACCELEROMETER,
  rssi: ACCELEROMETER,
  gyro: ACCELEROMETER,
  gps: ACCELEROMETER
};

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
    sample: function() {
      return samples[this.$route.params.sample];
    },
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
