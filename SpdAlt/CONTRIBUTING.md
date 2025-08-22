# Contributing to SpdAlt

Thank you for your interest in contributing to SpdAlt! We welcome contributions from the community.

## How to Contribute

### 1. Fork the Repository
- Fork the repository to your GitHub account
- Clone your fork locally: `git clone https://github.com/your-username/spdalt.git`

### 2. Create a Feature Branch
- Create a new branch for your feature: `git checkout -b feature/amazing-feature`
- Use descriptive branch names following the pattern: `feature/`, `bugfix/`, `docs/`, `refactor/`

### 3. Make Your Changes
- Follow the existing code style and conventions
- Write tests for new functionality
- Ensure all tests pass: `npm test`
- Run linting: `npm run lint`
- Check TypeScript types: `npm run typecheck`

### 4. Commit Your Changes
- Use clear, descriptive commit messages
- Follow conventional commit format when possible:
  - `feat: add new feature`
  - `fix: resolve bug`
  - `docs: update documentation`
  - `style: improve code formatting`
  - `refactor: restructure code`
  - `test: add or update tests`

### 5. Push and Create Pull Request
- Push your changes: `git push origin feature/amazing-feature`
- Create a Pull Request against the `develop` branch
- Provide a clear description of your changes
- Reference any related issues

## Development Setup

1. Install dependencies: `npm install`
2. For iOS: `cd ios && bundle exec pod install && cd ..`
3. Start Metro: `npm start`
4. Run on Android: `npm run android`
5. Run on iOS: `npm run ios`

## Code Style

- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful variable and function names
- Add comments for complex logic

## Testing

- Write unit tests for new features
- Ensure all existing tests pass
- Test on both iOS and Android when possible
- Test edge cases and error conditions

## Reporting Bugs

When reporting bugs, please include:
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Device/platform information
- Screenshots or error logs if applicable

## Feature Requests

Feature requests are welcome! Please provide:
- Clear description of the feature
- Use case or problem it solves
- Any relevant mockups or examples

## Questions?

If you have questions about contributing, feel free to:
- Open an issue with your question
- Join our community discussions
- Check existing documentation and issues first

## License

By contributing to SpdAlt, you agree that your contributions will be licensed under the MIT License.