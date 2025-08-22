/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

// Mock the AppNavigator to avoid navigation complexity in tests
jest.mock('../src/navigation/AppNavigator', () => ({
  AppNavigator: () => <div>Mock App Navigator</div>,
}));

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
