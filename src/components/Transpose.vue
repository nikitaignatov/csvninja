<template>
    <div class="transpose">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-textarea
                        label="Csv Input"
                        rows="5"
                        cols="120"
                        v-model="input"
                        @keyup="zip"
                    ></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-textarea
                        v-model="output"
                        label="Csv Output"
                        rows="5"
                        cols="120"
                        @keyup="unzip"
                    ></v-textarea>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import parse from 'csv-parse/lib/sync';
import stringify from 'csv-stringify/lib/sync';
import { OPTIONS } from '@/store/modules/csv';

import _ from 'lodash';
import * as samples from '@/samples';

const transpose = input => {
    const data = parse(input, OPTIONS);
    const transposed = _.zip.apply(_, data);
    return stringify(transposed);
};

export default {
    methods: {
        zip: function(x) {
            this.output = transpose(x.target.value);
        },
        unzip: function(x) {
            this.input = transpose(x.target.value);
        }
    },
    data: function() {
        return {
            input: samples.GYRO,
            output: transpose(samples.GYRO),
            selectedLabel: 0
        };
    }
};
</script>
