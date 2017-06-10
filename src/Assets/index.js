import Expo from 'expo';

// Map of assets names to modules
const modules = {
  'player-sprite': require('./floaty.png'),
  'pipe-top': require('./pillar.png'),
  'start-screen': require('./splash.png'),
};

// Export map of assets names to 'Expo.Asset' objects
export default Object.assign(
  {},
  ...Object.keys(modules).map(name => ({
    [name]: Expo.Asset.fromModule(modules[name])
  }))
)
