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
                        @keyup="convert"
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

export default {
    name: 'Transpose',
    props: {
        msg: String
    },
    methods: {
        convert: function(x) {
            var data = parse(x.target.value, OPTIONS);
            this.output = stringify(_.zip.apply(_, data));
        }
    },
    computed: {},
    data: function() {
        return {
            input: samples.GYRO,
            output: '',
            selectedLabel: 0
        };
    }
};
</script>
