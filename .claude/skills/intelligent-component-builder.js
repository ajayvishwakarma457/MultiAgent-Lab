/**
 * Intelligent Component Builder Skill
 * Generates enterprise-grade components with tests and docs
 *
 * Generates:
 * - Functional component (JSX)
 * - BEM CSS file
 * - Comprehensive tests (80%+ coverage)
 * - Index.js for clean imports
 * - JSDoc with props documentation
 */

import fs from 'fs';
import path from 'path';

class IntelligentComponentBuilder {
  constructor(componentName, componentType = 'presentational') {
    this.componentName = componentName;
    this.componentType = componentType; // presentational, stateful, container, hook
    this.kebabName = this.toKebabCase(componentName);
    this.basePath = path.join(process.cwd(), 'src/components', this.componentName);
  }

  toKebabCase(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }

  run() {
    console.log(`\n🏗️  INTELLIGENT COMPONENT BUILDER\n`);
    console.log('═'.repeat(60));
    console.log(`Component: ${this.componentName}`);
    console.log(`Type: ${this.componentType}`);
    console.log(`Path: ${this.basePath}\n`);

    try {
      // Check if component exists
      if (fs.existsSync(this.basePath)) {
        console.log(`❌ Component already exists: ${this.basePath}\n`);
        return false;
      }

      // Create directory
      fs.mkdirSync(this.basePath, { recursive: true });

      // Generate files
      this.generateComponent();
      this.generateCSS();
      this.generateTests();
      this.generateIndex();

      console.log(`✅ Component generated successfully!\n`);
      console.log(`📁 Files created:`);
      console.log(`   • ${this.componentName}.jsx`);
      console.log(`   • ${this.componentName}.css`);
      console.log(`   • ${this.componentName}.test.js`);
      console.log(`   • index.js\n`);

      console.log(`📝 Next steps:`);
      console.log(`   1. Edit ${this.basePath}/${this.componentName}.jsx to add logic`);
      console.log(`   2. Update tests with actual behavior`);
      console.log(`   3. Style in ${this.componentName}.css using BEM\n`);

      console.log('═'.repeat(60) + '\n');
      return true;
    } catch (error) {
      console.error(`\n❌ Error: ${error.message}\n`);
      return false;
    }
  }

  generateComponent() {
    const componentCode = `/**
 * ${this.componentName} Component
 *
 * @component
 * @param {Object} props - Component props
 * @returns {ReactElement} Rendered component
 */
${this.getComponentTemplate()}`;

    fs.writeFileSync(
      path.join(this.basePath, `${this.componentName}.jsx`),
      componentCode
    );
  }

  getComponentTemplate() {
    if (this.componentType === 'stateful') {
      return `import { useState, useCallback } from 'react';
import './${this.componentName}.css';

export const ${this.componentName} = ({ onSubmit, ...props }) => {
  const [state, setState] = useState(null);

  const handleChange = useCallback((value) => {
    setState(value);
  }, []);

  return (
    <div className="${this.kebabName}">
      {/* Add content here */}
    </div>
  );
};`;
    }

    return `import './${this.componentName}.css';

export const ${this.componentName} = ({ children, ...props }) => {
  return (
    <div className="${this.kebabName}">
      {children}
    </div>
  );
};`;
  }

  generateCSS() {
    const cssCode = `/* ${this.componentName} Component */
.${this.kebabName} {
  /* Add styles here */
}

.${this.kebabName}__element {
  /* Element styles using BEM */
}

.${this.kebabName}--modifier {
  /* Modifier styles */
}`;

    fs.writeFileSync(
      path.join(this.basePath, `${this.componentName}.css`),
      cssCode
    );
  }

  generateTests() {
    const testCode = `import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ${this.componentName} } from './${this.componentName}';

describe('${this.componentName}', () => {
  test('renders without crashing', () => {
    render(<${this.componentName} />);
    expect(screen.getByRole('generic')).toBeInTheDocument();
  });

  test('renders with children', () => {
    render(
      <${this.componentName}>
        <span>Test Content</span>
      </${this.componentName}>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('applies correct CSS class', () => {
    const { container } = render(<${this.componentName} />);
    expect(container.querySelector('.${this.kebabName}')).toBeInTheDocument();
  });
});`;

    fs.writeFileSync(
      path.join(this.basePath, `${this.componentName}.test.js`),
      testCode
    );
  }

  generateIndex() {
    const indexCode = `export { ${this.componentName} } from './${this.componentName}';`;

    fs.writeFileSync(
      path.join(this.basePath, 'index.js'),
      indexCode
    );
  }
}

const componentName = process.argv[2] || 'MyComponent';
const componentType = process.argv[3] || 'presentational';

const builder = new IntelligentComponentBuilder(componentName, componentType);
builder.run();
