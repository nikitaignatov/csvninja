<template>
  <div class="hello">
    <textarea
      :value="input"
      rows="5"
      cols="80"
      @change="x=>read(x.target.value)"
      :placeholder="example"
    ></textarea>
    <textarea v-model="labelsInput" rows="5" cols="80"></textarea>
    <br />
    <select v-model="columns" multiple>
      <option disabled value="0">Please select one</option>
      <option v-for="column in headers" :key="column" v-bind:value="column">{{column}}</option>
    </select>
    <select v-model="selectedLabel">
      <option disabled value="0">Please select one</option>
      <option v-for="label in labels" :key="label" v-bind:value="label">{{label}}</option>
    </select>
    <button @click="annotateData">annotate</button>
    <div>
      <apexchart
        :options="options(select)"
        height="300"
        width="800"
        :series="series.filter(x=>contains(x.name))"
      ></apexchart>
    </div>
    <div v-for="s in series" :key="s.name">
      <apexchart
        :options="options(select)"
        height="160"
        width="800"
        v-if="contains(s.name)"
        :series="[s]"
      ></apexchart>
    </div>
    <h2>Output</h2>
    <pre>{{output}}</pre>
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
    ...mapActions("annotation", ["select"]),
    contains: function(s) {
      return _.includes(this.columns, s);
    },
    annotateData: function() {
      for (var i = this.range.from; i < this.range.to; i++) {
        this.data2[this.headers.indexOf(LABEL)][i] = this.selectedLabel;
      }
      
      this.convert();
      this.renderAnnotations();
    },
    renderAnnotations: function() {
      var m = this.options.annotations.xaxis;
      console.log("ann", m);
      m = [];
      var labelIndex = this.headers.indexOf(LABEL);
      var labels = this.data2[labelIndex];
      console.log("labels", labels);
      var start = 0;
      for (var i = 0; i < labels.length; i++) {
        if (i > 0) {
          var same = labels[i] === labels[i - 1];
          if (!same) {
            m.push({
              x: start,
              x2: i,
              fillColor: this.colors[this.labels.indexOf(labels[i - 1])],
              label: {
                text: labels[i - 1]
              }
            });
            start = i;
          } else if (i === labels.length - 1) {
            m.push({
              x: start,
              x2: i + 1,
              fillColor: this.colors[this.labels.indexOf(labels[i - 1])],
              label: {
                text: labels[i]
              }
            });
          }
        }
      }
      this.$set(this, "options", {
        ...this.options,
        annotations: {
          xaxis: m
        }
      });
    },
    convert: function() {
      var csv = data.map(x => x.join(","));
      csv = _.concat(this.headers.join(","), csv);
      csv = csv.join("\n");
      this.output = csv;
    }
  },
  computed: {
    ...mapState("csv", ["output", "input", "data", "headers", "example"]),
    ...mapState("annotation", ["colors", "range"]),
    ...mapGetters("annotation", {
      options: "getOptions"
    }),
    data2: function() {
      var xs = this.converted.map(x => x.slice(1));
      if (xs.length > 0)
        for (var i = 0; i < xs[0].length; i++) {
          if (xs[this.headers.indexOf(LABEL)]) {
            if (!xs[this.headers.indexOf(LABEL)][i]) {
              xs[this.headers.indexOf(LABEL)][i] = this.labels[0];
            }
          } else {
            xs.push([this.labels[0]]);
          }
        }
      return xs;
    },
    series: function() {
      var data = this.data2;
      return this.headers.map((x, i) => {
        return { name: x, data: data[i] };
      });
    },
    converted: function() {
      return _.zip.apply(_, this.data);
    },
    labels: function() {
      return this.labelsInput.split("\n");
    }
  },
  data: function() {
    return {
      labelsInput: "unknown\nrest\nswing up\nswing down\nswitch hand",
      columns: [],
      selectedLabel: 0
    };
  }
};
</script> 