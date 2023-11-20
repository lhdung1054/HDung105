import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [BMI, setBMI] = useState(0);
  const [BMICategory, setBMICategory] = useState("");

  const computeBMI = () => {
    const weightInKg = parseFloat(weight);
    const heightInM = parseFloat(height) / 100;
    const bmi = weightInKg / (heightInM * heightInM);

    let bmiCategory = 0;
    if (bmi < 18.5) {
      bmiCategory = "Thiếu cân";
    } else if (18.5>bmi < 24.9) {
      bmiCategory = "Bình thường";
    } else if (bmi > 25) {
      bmiCategory = "binh";
    } else if (bmi < 30.0) {
      bmiCategory = "Thừa cân độ 2";
    } else {
      bmiCategory = "Béo phì";
    }

    setBMI(bmi);
    setBMICategory(bmiCategory);
  };

  const clearInputs = () => {
    setWeight("");
    setHeight("");
    setBMI(0);
    setBMICategory("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chỉ Số BMI</Text>
      <TextInput
        style={styles.input}
        placeholder="Cân nặng (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={(text) => setWeight(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Chiều cao (cm)"
        keyboardType="numeric"
        value={height}
        onChangeText={(text) => setHeight(text)}
      />
      <TouchableOpacity style={styles.button} onPress={computeBMI}>
        <Text style={styles.buttonText}>Calculate BMI</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.clearButton} onPress={clearInputs}>
        <Text style={styles.clearButtonText}>Clear</Text>
      </TouchableOpacity>
      <Text style={styles.result}>
        BMI: {BMI} (Category: {BMICategory})
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lavender",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
  button: {
    width: "80%",
    height: 40,
    backgroundColor: "pink",
    color: "#fff",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  clearButton: {
    width: 80,
    height: 40,
    backgroundColor: "green",
    color: "#000",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  result: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
  },
});

export default BMICalculator;
