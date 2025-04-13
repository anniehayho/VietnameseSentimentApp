import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { analyzeSentiment, formatSentimentResult } from '../services/sentimentService';

const SentimentScreen = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      Alert.alert('Error', 'Please enter some Vietnamese text to analyze');
      return;
    }

    setLoading(true);
    
    try {
      const apiResult = await analyzeSentiment(text);
      const formattedResult = formatSentimentResult(apiResult);
      setResult(formattedResult);
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to analyze sentiment. Please try again later.'
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return '#4CAF50'; // Green
      case 'Negative':
        return '#F44336'; // Red
      case 'Neutral':
        return '#2196F3'; // Blue
      default:
        return '#9E9E9E'; // Gray
    }
  };

  const renderResultCard = () => {
    if (!result) return null;

    const { sentiment, score, details } = result;
    const color = getSentimentColor(sentiment);

    return (
      <View style={styles.resultCard}>
        <Text style={styles.resultTitle}>Sentiment Analysis Result</Text>
        
        <View style={[styles.sentimentBadge, { backgroundColor: color }]}>
          <Text style={styles.sentimentText}>{sentiment}</Text>
        </View>
        
        <Text style={styles.scoreText}>Confidence: {(score * 100).toFixed(1)}%</Text>
        
        {details && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>Details:</Text>
            <View style={styles.detailItem}>
              <Text>Positive: </Text>
              <View style={[styles.progressBar, { width: `${details.positive * 100}%`, backgroundColor: '#4CAF50' }]} />
              <Text>{(details.positive * 100).toFixed(1)}%</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text>Neutral: </Text>
              <View style={[styles.progressBar, { width: `${details.neutral * 100}%`, backgroundColor: '#2196F3' }]} />
              <Text>{(details.neutral * 100).toFixed(1)}%</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text>Negative: </Text>
              <View style={[styles.progressBar, { width: `${details.negative * 100}%`, backgroundColor: '#F44336' }]} />
              <Text>{(details.negative * 100).toFixed(1)}%</Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Vietnamese Sentiment Analysis</Text>
        <Text style={styles.subtitle}>Using PhoBERT Model</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Vietnamese text..."
            value={text}
            onChangeText={setText}
            multiline
            numberOfLines={4}
          />
          
          <TouchableOpacity 
            style={styles.clearButton} 
            onPress={() => setText('')}
            disabled={!text.length}
          >
            <Ionicons name="close-circle" size={20} color={text.length ? '#666' : '#ccc'} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={[
            styles.analyzeButton,
            (loading || !text.trim().length) && styles.disabledButton
          ]} 
          onPress={handleAnalyze}
          disabled={loading || !text.trim().length}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Analyze Sentiment</Text>
          )}
        </TouchableOpacity>
        
        {renderResultCard()}
        
        <View style={styles.exampleContainer}>
          <Text style={styles.exampleTitle}>Example Vietnamese Sentences:</Text>
          <TouchableOpacity 
            style={styles.exampleButton} 
            onPress={() => setText('Bộ phim này rất hay và cảm động.')}
          >
            <Text style={styles.exampleText}>Bộ phim này rất hay và cảm động.</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.exampleButton} 
            onPress={() => setText('Tôi không hài lòng với dịch vụ này.')}
          >
            <Text style={styles.exampleText}>Tôi không hài lòng với dịch vụ này.</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.exampleButton} 
            onPress={() => setText('Chất lượng sản phẩm bình thường.')}
          >
            <Text style={styles.exampleText}>Chất lượng sản phẩm bình thường.</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.footerText}>
          Powered by wonrax/phobert-base-vietnamese-sentiment model
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  clearButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  analyzeButton: {
    backgroundColor: '#5C6BC0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#9E9E9E',
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  sentimentBadge: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 15,
  },
  sentimentText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  scoreText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  detailsContainer: {
    marginTop: 10,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 10,
    flex: 1,
  },
  exampleContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  exampleButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  exampleText: {
    fontSize: 14,
    color: '#333',
  },
  footerText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 12,
    marginTop: 10,
  },
});

export default SentimentScreen; 