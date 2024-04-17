const chalk = require('chalk')
const { readFile, writeFile, copyFile } = require('fs').promises

console.log(chalk.green('here'))

function log(...args) {
  console.log(chalk.yellow('[react-native-maps]'), ...args)
}

reactNativeMaps = async function() {
  log('📦 Creating web compatibility of react-native-maps using an empty module loaded on web builds')
  const modulePath = 'node_modules/react-native-maps'
  await writeFile(`${modulePath}/lib/index.web.js`, 'module.exports = {}', 'utf-8')
  await copyFile(`${modulePath}/lib/index.d.ts`, `${modulePath}/lib/index.web.d.ts`)
  const pkg = JSON.parse(await readFile(`${modulePath}/package.json`))
  pkg['react-native'] = 'lib/index.js'
  pkg['main'] = 'lib/index.web.js'
  await writeFile(`${modulePath}/package.json`, JSON.stringify(pkg, null, 2), 'utf-8')
  log('✅ script ran successfully')
}

reactNativeMaps()


import React, { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { colors, globalStyles } from "../styles/global";
import Map from "../components/Map";
import { SafeAreaView } from "react-native-safe-area-context";

const data = [
  {
    id: 1,
    name: "Restaurante 1",
    latitude: 41.805827,
    longitude: -6.757289,
    description: "Aqui vai uma descrição do restaurante",
    category: "Tradicional",
  },
  {
    id: 2,
    name: "Churrasqueira 1",
    latitude: 41.815817,
    longitude: -6.757189,
    description: "Aqui vai uma descrição do restaurante",
    category: "Churrasqueira",
  },
  {
    id: 3,
    name: "Churrasqueira 3",
    latitude: 41.814817,
    longitude: -6.777189,
    description: "Aqui vai uma descrição do restaurante",
    category: "Churrasqueira",
  },
  {
    id: 4,
    name: "Tasca do Zé 1",
    latitude: 41.815817,
    longitude: -6.787189,
    description: "Aqui vai uma descrição do restaurante",
    category: "Petiscos",
  },
  {
    id: 5,
    name: "Sabor na brasa",
    latitude: 41.795817,
    longitude: -6.737189,
    description: "Aqui vai uma descrição do restaurante",
    category: "Churrasqueira",
  },
];

const uniqueCategories = [...new Set(data.map((item) => item.category))];

console.log(uniqueCategories);

const filters = ["Todos", "Tradicional", "Churrasqueira", "Petiscos"];

export default function MapScreen({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState("Todos");

  const filteredData = data.filter(
    (item) => item.category === selectedFilter || selectedFilter === "Todos"
  );

  console.log(filteredData);
  return (
    <View style={styles.container}>
      <View style={styles.containerMap}>
        <Map restaurantes={filteredData} />
      </View>
      <View style={styles.containerFilters}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={styles.buttonStyle}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={styles.filterText}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <SafeAreaView style={styles.containerList}>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                globalStyles.card,
                {
                  backgroundColor: colors.primary,
                },
              ]}
              onPress={() => console.log(item.name)}
            >
              <Text style={{ color: "white" }}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
        {/* <TouchableOpacity
          style={globalStyles.buttonStyle}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonTextStyle}>Home</Text>
        </TouchableOpacity> */}
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTextStyle: {
    color: "white",
    fontSize: 16,
  },
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    backgroundColor: "#ddd",
    borderRadius: 5,
    width: 200,
  },
  containerMap: {
    flex: 0.6,
    width: "100%",
    borderColor: "red",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  containerFilters: {
    flex: 0.1,
    width: "100%",
  },
  filtersContentContainer: {
    alignItems: "center",
    paddingVertical: 5,
    backgroundColor: "white",
  },
  containerList: {
    flex: 0.3,
    width: "100%",
  },
  scrollView: {
    padding: 10,
  },
});
