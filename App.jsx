import { HomeScreen } from './HomeScreen';
import { DetailsScreen } from './DetailScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Главный экран" component={HomeScreen} />
        <Stack.Screen name="Описание объекта" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const Stack = createNativeStackNavigator();

