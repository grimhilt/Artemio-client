import { useLocalStorage, useColorScheme } from '@mantine/hooks';

const useColorSchemeToggle = function(){
	const defaultColorScheme = useColorScheme()
	const [colorScheme, setColorScheme] = useLocalStorage({
		key: 'mantine-color-scheme',
		defaultValue: defaultColorScheme,
		getInitialValueInEffect: true,
	});
	const toggleColorScheme = () =>
		setColorScheme((colorScheme === 'dark' ? 'light' : 'dark'));
	return [ colorScheme, toggleColorScheme ];
};

export { useColorSchemeToggle };
