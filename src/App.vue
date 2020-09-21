<template>
    <v-app id="inspire">
        <v-navigation-drawer
            v-model="drawer"
            :clipped="$vuetify.breakpoint.lgAndUp"
            app
        >
            <v-list dense>
                <template v-for="item in items">
                    <v-row
                        v-if="item.heading"
                        :key="item.heading"
                        align="center"
                    >
                        <v-col cols="6">
                            <v-subheader v-if="item.heading">{{
                                item.heading
                            }}</v-subheader>
                        </v-col>
                        <v-col cols="6" class="text-center">
                            <a href="#!" class="body-2 black--text">EDIT</a>
                        </v-col>
                    </v-row>
                    <v-list-group
                        v-else-if="item.children"
                        :key="item.text"
                        v-model="item.model"
                        :prepend-icon="
                            item.model ? item.icon : item['icon-alt']
                        "
                        append-icon
                    >
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title>{{
                                    item.text
                                }}</v-list-item-title>
                            </v-list-item-content>
                        </template>
                        <v-list-item
                            v-for="(child, i) in item.children"
                            :key="i"
                            link
                        >
                            <v-list-item-action v-if="child.icon">
                                <v-icon>{{ child.icon }}</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>{{
                                    child.text
                                }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                    <v-list-item v-else :key="item.text" link>
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>{{
                                item.text
                            }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
            :clipped-left="$vuetify.breakpoint.lgAndUp"
            app
            color="blue darken-3"
            dark
        >
            <v-app-bar-nav-icon
                @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>
            <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
                <span class="hidden-sm-and-down">CSV.ninja</span>
            </v-toolbar-title>
            <v-text-field
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="Search"
                class="hidden-sm-and-down"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>mdi-cog</v-icon>
            </v-btn>
        </v-app-bar>
        <v-main>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <router-view />
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    props: {
        source: String
    },
    data: () => ({
        dialog: false,
        drawer: null,
        items: [
            {
                text: 'Time Series',
                icon: 'mdi-chevron-up',
                'icon-alt': 'mdi-chevron-down',
                model: true,
                children: [
                    { icon: 'mdi-crosshairs-gps', text: 'Gps' },
                    { icon: 'mdi-signal-cellular-2', text: 'RSSI' },
                    { icon: 'mdi-rotate-orbit', text: 'Gyro' },
                    { icon: 'mdi-axis-arrow', text: 'Accelerometer' },
                    { icon: 'mdi-speedometer', text: 'Speedometer' },
                    { icon: 'mdi-lightbulb-on-outline', text: 'Light' },
                    { icon: 'mdi-thermometer-plus', text: 'Temperature' },
                    { icon: 'mdi-gauge', text: 'Pressure' }
                ]
            }
        ]
    })
};
</script>
