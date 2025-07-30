import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

const { width } = Dimensions.get('window');

interface RadioOption {
  value: string;
  label: string;
  icon: string;
}

export default function CalculatorScreen() {
  const [numbersInput, setNumbersInput] = useState('');
  const [selectedOperation, setSelectedOperation] = useState('average');
  const [result, setResult] = useState<{
    title: string;
    value: number;
    details: string;
  } | null>(null);

  const radioOptions: RadioOption[] = [
    { value: 'average', label: 'Hitung Rata-rata', icon: '📊' },
    { value: 'maximum', label: 'Cari Nilai Terbesar', icon: '🔝' },
  ];

  const showError = (message: string) => {
    Alert.alert('Error', message);
  };

  const parseNumbers = (input: string) => {
    const nums = input
      .split(/[,\s]+/)
      .map(n => n.trim())
      .filter(n => n !== '')
      .map(n => parseFloat(n))
      .filter(n => !isNaN(n));
    
    return nums;
  };

  const calculateResult = () => {
    if (!numbersInput.trim()) {
      showError('❌ Silakan masukkan angka terlebih dahulu!');
      return;
    }

    const nums = parseNumbers(numbersInput);
    
    if (nums.length === 0) {
      showError('❌ Format angka tidak valid! Pastikan menggunakan angka yang benar.');
      return;
    }

    if (nums.length < 5) {
      showError(`❌ Minimal harus memasukkan 5 angka! Anda baru memasukkan ${nums.length} angka.`);
      return;
    }

    let calculatedResult: number;
    let title: string;
    
    if (selectedOperation === 'average') {
      const sum = nums.reduce((acc, num) => acc + num, 0);
      calculatedResult = sum / nums.length;
      title = '📊 Rata-rata:';
    } else {
      calculatedResult = Math.max(...nums);
      title = '🔝 Nilai Terbesar:';
    }

    const details = `Angka yang dimasukkan: ${nums.join(', ')}\nJumlah angka: ${nums.length}${
      selectedOperation === 'average' ? `\nTotal: ${nums.reduce((a, b) => a + b, 0)}` : ''
    }`;

    setResult({
      title,
      value: calculatedResult,
      details,
    });
  };

  const resetCalculator = () => {
    setNumbersInput('');
    setSelectedOperation('average');
    setResult(null);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>🧮 Kalkulator Angka</ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          Hitung rata-rata dan nilai terbesar dengan mudah
        </ThemedText>
        <View style={styles.developerInfo}>
          <ThemedText style={styles.developerName}>Clavino Ourizqi Rachmadi</ThemedText>
          <ThemedText style={styles.developerNim}>NIM: 41523010140</ThemedText>
        </View>
      </View>

      <ThemedView style={styles.content}>
        <ThemedView style={styles.inputSection}>
          <ThemedText style={styles.label}>Masukkan Angka (minimal 5 angka)</ThemedText>
          <ThemedText style={styles.inputHint}>Pisahkan dengan koma atau spasi</ThemedText>
          <TextInput
            style={styles.textInput}
            value={numbersInput}
            onChangeText={setNumbersInput}
            placeholder="Contoh: 10, 20, 30, 40, 50"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </ThemedView>

        <ThemedView style={styles.radioSection}>
          <ThemedText style={styles.radioTitle}>Pilih Operasi:</ThemedText>
          <ThemedView style={styles.radioGroup}>
            {radioOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.radioOption,
                  selectedOperation === option.value && styles.radioOptionSelected,
                ]}
                onPress={() => setSelectedOperation(option.value)}
              >
                <ThemedView style={[
                  styles.radioButton,
                  selectedOperation === option.value && styles.radioButtonSelected,
                ]}>
                  {selectedOperation === option.value && (
                    <ThemedView style={styles.radioButtonInner} />
                  )}
                </ThemedView>
                <ThemedText style={styles.radioLabel}>
                  {option.icon} {option.label}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.buttonGroup}>
          <TouchableOpacity style={styles.btnPrimary} onPress={calculateResult}>
            <ThemedText style={styles.btnText}>✨ Hitung</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSecondary} onPress={resetCalculator}>
            <ThemedText style={styles.btnText}>🔄 Reset</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {result && (
          <ThemedView style={styles.resultSection}>
            <ThemedText style={styles.resultTitle}>{result.title}</ThemedText>
            <ThemedText style={styles.resultValue}>{result.value.toFixed(2)}</ThemedText>
            <ThemedText style={styles.resultDetails}>{result.details}</ThemedText>
          </ThemedView>
        )}

        <ThemedView style={styles.instructions}>
          <ThemedText style={styles.instructionsTitle}>📋 Petunjuk Penggunaan:</ThemedText>
          <ThemedText style={styles.instructionsText}>
            1. Masukkan minimal 5 angka di kolom input{'\n'}
            2. Pisahkan angka dengan koma (,) atau spasi{'\n'}
            3. Pilih operasi yang diinginkan (rata-rata atau nilai terbesar){'\n'}
            4. Klik tombol "Hitung" untuk melihat hasil{'\n'}
            5. Gunakan tombol "Reset" untuk menghapus semua data
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4facfe',
    padding: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
  },
  developerInfo: {
    marginTop: 15,
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
  },
  developerName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  developerNim: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  content: {
    padding: 20,
  },
  inputSection: {
    marginBottom: 25,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    fontSize: 16,
  },
  inputHint: {
    color: '#666',
    fontSize: 12,
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#e1e5e9',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    minHeight: 80,
    backgroundColor: 'white',
  },
  radioSection: {
    marginBottom: 25,
  },
  radioTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  radioGroup: {
    gap: 12,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 2,
    borderColor: '#e1e5e9',
    borderRadius: 10,
    backgroundColor: '#f8f9fa',
  },
  radioOptionSelected: {
    borderColor: '#4facfe',
    backgroundColor: 'rgba(79, 172, 254, 0.1)',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#4facfe',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    backgroundColor: '#4facfe',
    borderRadius: 5,
  },
  radioLabel: {
    fontSize: 16,
    color: '#333',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 25,
  },
  btnPrimary: {
    flex: 1,
    backgroundColor: '#4facfe',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnSecondary: {
    flex: 1,
    backgroundColor: '#6c757d',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  resultSection: {
    backgroundColor: 'rgba(168, 237, 234, 0.3)',
    borderRadius: 15,
    padding: 25,
    marginBottom: 25,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  resultValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 15,
  },
  resultDetails: {
    color: '#34495e',
    fontSize: 14,
    lineHeight: 20,
  },
  instructions: {
    backgroundColor: '#f8f9fa',
    borderLeftWidth: 4,
    borderLeftColor: '#4facfe',
    padding: 20,
    borderRadius: 10,
  },
  instructionsTitle: {
    color: '#333',
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  instructionsText: {
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
  },
});
