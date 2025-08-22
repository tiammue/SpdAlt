const Geolocation = {
  getCurrentPosition: jest.fn((success, error, options) => {
    const mockPosition = {
      coords: {
        latitude: 37.7749,
        longitude: -122.4194,
        altitude: 10,
        accuracy: 5,
        altitudeAccuracy: 10,
        heading: 0,
        speed: 0,
      },
      timestamp: Date.now(),
    };
    success(mockPosition);
  }),

  watchPosition: jest.fn((success, error, options) => {
    const mockPosition = {
      coords: {
        latitude: 37.7749,
        longitude: -122.4194,
        altitude: 10,
        accuracy: 5,
        altitudeAccuracy: 10,
        heading: 0,
        speed: 0,
      },
      timestamp: Date.now(),
    };
    success(mockPosition);
    return 1; // mock watch ID
  }),

  clearWatch: jest.fn((watchID) => {
    // Mock clear watch
  }),

  stopObserving: jest.fn(),

  requestAuthorization: jest.fn(() => Promise.resolve('granted')),

  setRNConfiguration: jest.fn(),
};

export default Geolocation;