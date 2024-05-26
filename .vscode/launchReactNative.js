const path = require('path');
const findXcodeProject = require('@react-native-community/cli-platform-ios/build/config/findXcodeProject');

const workspaceRoot = process.env.REACT_NATIVE_PACKAGER_SRC_ROOT || process.cwd();
const xcodeProject = findXcodeProject(workspaceRoot);

if (!xcodeProject) {
  console.error('Could not find Xcode project files in ios folder');
  process.exit(1);
}

console.log('Found Xcode project:', xcodeProject);
