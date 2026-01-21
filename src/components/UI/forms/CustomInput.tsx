import { View, TextInput, StyleSheet, Platform, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { maskPhone, maskCurrency, maskVisaCard, maskExpDate, maskName } from '../../../utils/masks'

type validationProp = {
  isValid: boolean,
  error: string
}

const CustomInput = ( { onInput, mask, presetValue, className, reset, rules, prefix, isTouched, ...rest }: any) => {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);
  const [validation, setValidation] = useState<validationProp>({isValid: true, error: ''})

  useEffect(() => {
    onChange(value)
  }, [value])

  useEffect(() => {
    if(isTouched) {
      setTouched(true);
    }
  }, [isTouched])

  useEffect(() => {
    if(presetValue) {
      onChange(presetValue)
    }
  }, [presetValue])

  useEffect(() => {
    if(reset) {
      setValue('')
    }
  }, [reset])

  const onChange = (text: string) => {
    let newValue = text;
    
    if(mask) {
      if(mask && mask == "numeric") {
        newValue = text.replace(/[^0-9]/g, '');
      } else if (mask == "phone") {
        newValue = maskPhone(text)
      } else if(mask == "currency") {
        newValue = maskCurrency(text)
      } else if(mask == "maskVisaCard") {
        newValue = maskVisaCard(text)
      } else if(mask == "maskExpDate") {
        newValue = maskExpDate(text)
      } else if(mask == "maskName") {
        newValue = maskName(text)
      }
    }
    setValue(newValue);
    const validationResult: validationProp = validateRules(value);
    setValidation(validationResult);
    onInput({value: value, isValid: validationResult.isValid});
  }

  const validateRules = (value: string):validationProp => {
    let validationResult = { isValid: true, error: '' }
    if(!rules) return validationResult;

    rules.find((rule: Function) => {
      const result = rule(value);
      if(result !== true) {
        validationResult = {
          isValid: false,
          error: result
        }
      }
    });
    return validationResult
  }

  const onBlur = () => {
    setTouched(true);
  }

  return (
    <View style={{width: '100%'}}>
      <View style={[styles.container]}>
        <TextInput
          style={[styles.input, !validation.isValid && touched ? { borderColor: 'red' } : {}]}
          value={value}
          placeholderTextColor="#FFA07A"
          onChangeText={onChange}
          onBlur={onBlur}
          {...rest}
        />
        <View style={styles.prefixContainer}>
          <Text style={styles.prefixText}>{prefix}</Text>
        </View>
      </View>
      {
        (!validation.isValid && touched) && <Text style={styles.errorText}>{validation.error}</Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
  prefixContainer: {
    position: 'absolute',
    left: 12,
  },
  prefixText: {
    fontSize: 16,
    color: '#555',
  },
});

export default CustomInput