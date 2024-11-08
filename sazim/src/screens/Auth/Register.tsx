import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';


const Register = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);

    const validateFields = () => {
        const newErrors: { [key: string]: string } = {};

        if (!firstName.trim()) newErrors.firstName = 'First Name cannot be empty';
        if (!lastName.trim()) newErrors.lastName = 'Last Name cannot be empty';
        if (!address.trim()) newErrors.address = 'Address cannot be empty';
        if (!validateEmail(email)) newErrors.email = 'Please enter a valid email';
        if (!phone.trim()) newErrors.phone = 'Phone Number cannot be empty';
        if (!password) newErrors.password = 'Password cannot be empty';
        if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const validateEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    };

    const handleRegister = () => {
        if (validateFields()) {
            console.log('Registration successful');
            // Proceed with the registration process, or API call
        }
    };

    const getInputStyle = (hasError: boolean) => {
        return StyleSheet.flatten([styles.input, hasError && styles.inputError]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headline}>Register</Text>

            <TextInput
                style={getInputStyle(!!errors.firstName)}
                placeholder="First Name"
                placeholderTextColor="#aaa"
                value={firstName}
                onChangeText={setFirstName}
            />
            {errors.firstName ? <Text style={styles.errorText}>{errors.firstName}</Text> : null}

            <TextInput
                style={getInputStyle(!!errors.lastName)}
                placeholder="Last Name"
                placeholderTextColor="#aaa"
                value={lastName}
                onChangeText={setLastName}
            />
            {errors.lastName ? <Text style={styles.errorText}>{errors.lastName}</Text> : null}

            <TextInput
                style={getInputStyle(!!errors.address)}
                placeholder="Address"
                placeholderTextColor="#aaa"
                value={address}
                onChangeText={setAddress}
            />
            {errors.address ? <Text style={styles.errorText}>{errors.address}</Text> : null}

            <TextInput
                style={getInputStyle(!!errors.email)}
                placeholder="Email"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

            <TextInput
                style={getInputStyle(!!errors.phone)}
                placeholder="Phone Number"
                placeholderTextColor="#aaa"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />
            {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}


            <View style={styles.passwordInputContainer}>
                <TextInput
                    style={[getInputStyle(!!errors.password), styles.passwordInput]}
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!passwordVisible}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                    <Text style={styles.toggleText}>{passwordVisible ? 'Hide' : 'Show'}</Text>
                </TouchableOpacity>
            </View>
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

            <View style={styles.passwordInputContainer}>
                <TextInput
                    style={[getInputStyle(!!errors.confirmPassword), styles.passwordInput]}
                    placeholder="Confirm Password"
                    placeholderTextColor="#aaa"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!confirmPasswordVisible}  // Add this line
                />
                <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                    <Text style={styles.toggleText}>{confirmPasswordVisible ? 'Hide' : 'Show'}</Text>
                </TouchableOpacity>
            </View>
            {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Already have an account? </Text>
                {/* <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.signupLink}>Sign In</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    headline: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 40,
        color: '#4B0082',
    },
    input: {
        width: '90%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        paddingLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    inputError: {
        borderColor: 'red',
    },
    button: {
        width: '40%',
        height: 50,
        backgroundColor: '#4B0082',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signupText: {
        fontSize: 16,
        color: '#333',
    },
    signupLink: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4B0082',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: -10,
        marginBottom: 20,
    },
    toggleText: {
        fontSize: 14,
        color: '#4B0082',
        marginBottom: 10,
    },
    passwordInput: {
        width: '80%',
        flex: 1,
        fontSize: 16,
        color: '#333',
        borderWidth: 0,
        marginBottom: 0
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        width: '90%',
        marginBottom: 20,
        paddingHorizontal: 10,
    }
});

export default Register;
