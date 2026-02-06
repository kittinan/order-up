# Input Components

## Input Overview
Input components allow users to enter and edit data. They come in various types to handle different data formats and user interactions.

## Base Input Styles
All input components share common base styles for consistency.

```scss
.input-base {
  width: 100%;
  padding: 0.75rem 1rem;  // 12px 16px
  font-size: var(--font-size-base);  // 16px
  font-family: inherit;
  line-height: 1.5;
  color: var(--color-gray-900);
  background-color: white;
  border: 1px solid var(--color-gray-300);
  border-radius: 0.375rem;  // 6px
  transition: all 0.2s ease;
  min-height: 44px;  // Accessibility: minimum touch target

  &:focus {
    outline: none;
    border-color: var(--color-primary-500);
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
  }

  &:hover {
    border-color: var(--color-gray-400);
  }

  &:disabled {
    background-color: var(--color-gray-50);
    color: var(--color-gray-500);
    border-color: var(--color-gray-200);
    cursor: not-allowed;
  }

  &::placeholder {
    color: var(--color-gray-400);
    font-weight: var(--font-weight-normal);
  }

  &.error {
    border-color: var(--color-error-500);
    
    &:focus {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
  }

  &.success {
    border-color: var(--color-success-500);
    
    &:focus {
      box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
    }
  }
}
```

## Text Input
Standard single-line text input field.

```scss
.input-text {
  @extend .input-base;
}

.input-text-lg {
  @extend .input-base;
  padding: 1rem 1.25rem;  // 16px 20px
  font-size: var(--font-size-lg);  // 18px
  border-radius: 0.5rem;  // 8px
}

.input-text-sm {
  @extend .input-base;
  padding: 0.5rem 0.75rem;  // 8px 12px
  font-size: var(--font-size-sm);  // 14px
  border-radius: 0.25rem;  // 4px
}
```

## Textarea
Multi-line text input for longer content.

```scss
.input-textarea {
  @extend .input-base;
  min-height: 120px;
  resize: vertical;
  padding: 0.75rem 1rem;
  font-family: inherit;
  line-height: 1.6;
}

.input-textarea-lg {
  min-height: 200px;
}

.input-textarea-sm {
  min-height: 80px;
  padding: 0.5rem 0.75rem;
  font-size: var(--font-size-sm);
}

// No resize option
.input-textarea-no-resize {
  resize: none;
}

// Horizontal resize only
.input-textarea-horizontal {
  resize: horizontal;
}
```

## Select Input
Dropdown selection component.

```scss
.input-select {
  @extend .input-base;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;  // Space for arrow

  &::-ms-expand {
    display: none;
  }
}

.input-select-sm {
  @extend .input-select;
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  font-size: var(--font-size-sm);
  background-size: 1em 1em;
}

.input-select-lg {
  @extend .input-select;
  padding: 1rem 3rem 1rem 1.25rem;
  font-size: var(--font-size-lg);
  background-size: 1.75em 1.75em;
}
```

## Checkbox Input
Multiple selection option.

```scss
.input-checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;  // 12px
}

.input-checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;  // 8px
  cursor: pointer;
}

.input-checkbox {
  width: 1.25rem;  // 20px
  height: 1.25rem;
  border: 2px solid var(--color-gray-300);
  border-radius: 0.25rem;  // 4px
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  flex-shrink: 0;

  &:checked {
    background-color: var(--color-primary-600);
    border-color: var(--color-primary-600);
  }

  &:checked::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 6px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
  }

  &:disabled {
    background-color: var(--color-gray-100);
    border-color: var(--color-gray-300);
    cursor: not-allowed;
  }

  &:disabled:checked {
    background-color: var(--color-gray-400);
  }
}

.input-checkbox-label {
  font-size: var(--font-size-base);
  color: var(--color-gray-700);
  cursor: pointer;
  user-select: none;

  .input-checkbox:disabled + & {
    color: var(--color-gray-500);
    cursor: not-allowed;
  }
}
```

## Radio Input
Single selection option.

```scss
.input-radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;  // 12px
}

.input-radio-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;  // 8px
  cursor: pointer;
}

.input-radio {
  width: 1.25rem;  // 20px
  height: 1.25rem;
  border: 2px solid var(--color-gray-300);
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  flex-shrink: 0;

  &:checked {
    background-color: white;
    border-color: var(--color-primary-600);
  }

  &:checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 6px;
    height: 6px;
    background-color: var(--color-primary-600);
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
  }

  &:disabled {
    background-color: var(--color-gray-100);
    border-color: var(--color-gray-300);
    cursor: not-allowed;
  }

  &:disabled:checked {
    border-color: var(--color-gray-400);
  }

  &:disabled:checked::after {
    background-color: var(--color-gray-400);
  }
}

.input-radio-label {
  font-size: var(--font-size-base);
  color: var(--color-gray-700);
  cursor: pointer;
  user-select: none;

  .input-radio:disabled + & {
    color: var(--color-gray-500);
    cursor: not-allowed;
  }
}
```

## Switch Input
Toggle switch for binary options.

```scss
.input-switch-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;  // 12px
  cursor: pointer;
}

.input-switch {
  position: relative;
  width: 3rem;  // 48px
  height: 1.75rem;  // 28px
  background-color: var(--color-gray-200);
  border-radius: 9999px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 1.375rem;  // 22px
    height: 1.375rem;  // 22px
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease;
  }
}

.input-switch-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + .input-switch {
    background-color: var(--color-primary-600);
  }

  &:checked + .input-switch::after {
    transform: translateX(1.25rem);  // 20px
  }

  &:disabled + .input-switch {
    background-color: var(--color-gray-300);
    cursor: not-allowed;
  }

  &:disabled:checked + .input-switch {
    background-color: var(--color-gray-400);
  }

  &:focus + .input-switch {
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
  }
}

.input-switch-label {
  font-size: var(--font-size-base);
  color: var(--color-gray-700);
  user-select: none;

  .input-switch-input:disabled + & {
    color: var(--color-gray-500);
  }
}
```

## File Input
File upload component.

```scss
.input-file-wrapper {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.input-file {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.input-file-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background-color: var(--color-gray-100);
  color: var(--color-gray-700);
  border: 2px dashed var(--color-gray-300);
  border-radius: 0.5rem;
  font-weight: var(--font-weight-medium);
  transition: all 0.2s ease;
  min-height: 44px;

  &:hover {
    background-color: var(--color-gray-200);
    border-color: var(--color-gray-400);
  }

  .input-file:focus + & {
    outline: none;
    border-color: var(--color-primary-500);
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
  }
}

.input-file-text {
  font-size: var(--font-size-base);
}

.input-file-icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
  color: var(--color-gray-500);
}
```

## Form Labels
Labels for form inputs with validation states.

```scss
.form-label {
  display: block;
  margin-bottom: 0.5rem;  // 8px
  font-size: var(--font-size-sm);  // 14px
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-700);
}

.form-label-required {
  &::after {
    content: ' *';
    color: var(--color-error-500);
  }
}

.form-label-error {
  color: var(--color-error-600);
}

.form-helper-text {
  display: block;
  margin-top: 0.25rem;  // 4px
  font-size: var(--font-size-xs);  // 12px
  color: var(--color-gray-500);
}

.form-helper-text-error {
  color: var(--color-error-600);
}

.form-helper-text-success {
  color: var(--color-success-600);
}
```

## Form Groups
Complete form field group with label, input, and helper text.

```scss
.form-group {
  margin-bottom: 1.5rem;  // 24px
}

.form-group-sm {
  margin-bottom: 1rem;  // 16px
}

.form-group-lg {
  margin-bottom: 2rem;  // 32px
}

// Horizontal form group
.form-group-horizontal {
  display: flex;
  align-items: center;
  gap: 1rem;  // 16px
  margin-bottom: 1rem;

  .form-label {
    flex: 0 0 200px;
    margin-bottom: 0;
  }

  .form-control {
    flex: 1;
  }
}

// Inline form group
.form-group-inline {
  display: flex;
  gap: 1rem;  // 16px
  align-items: flex-end;
}
```

## Input States
Visual states for validation and interaction.

```scss
// Success state
.input-success {
  border-color: var(--color-success-500) !important;

  &:focus {
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1) !important;
  }
}

// Error state
.input-error {
  border-color: var(--color-error-500) !important;

  &:focus {
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
  }
}

// Warning state
.input-warning {
  border-color: var(--color-warning-500) !important;

  &:focus {
    box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1) !important;
  }
}
```

## Usage Examples

### HTML Examples
```html
<!-- Basic Text Input -->
<div class="form-group">
  <label class="form-label" for="name">Full Name</label>
  <input type="text" id="name" class="input-text" placeholder="Enter your name">
  <span class="form-helper-text">Enter your full name as it appears on your ID</span>
</div>

<!-- Required Field with Error State -->
<div class="form-group">
  <label class="form-label form-label-required" for="email">Email Address</label>
  <input type="email" id="email" class="input-text input-error" placeholder="Enter your email">
  <span class="form-helper-text form-helper-text-error">Please enter a valid email address</span>
</div>

<!-- Select Input -->
<div class="form-group">
  <label class="form-label" for="role">Role</label>
  <select id="role" class="input-select">
    <option value="">Select a role</option>
    <option value="admin">Administrator</option>
    <option value="manager">Manager</option>
    <option value="user">User</option>
  </select>
</div>

<!-- Checkbox Group -->
<div class="form-group">
  <label class="form-label">Permissions</label>
  <div class="input-checkbox-group">
    <label class="input-checkbox-wrapper">
      <input type="checkbox" class="input-checkbox" checked>
      <span class="input-checkbox-label">Read Access</span>
    </label>
    <label class="input-checkbox-wrapper">
      <input type="checkbox" class="input-checkbox">
      <span class="input-checkbox-label">Write Access</span>
    </label>
    <label class="input-checkbox-wrapper">
      <input type="checkbox" class="input-checkbox">
      <span class="input-checkbox-label">Delete Access</span>
    </label>
  </div>
</div>

<!-- Switch Input -->
<div class="form-group">
  <label class="input-switch-wrapper">
    <input type="checkbox" class="input-switch-input" id="notifications" checked>
    <span class="input-switch"></span>
    <span class="input-switch-label">Email Notifications</span>
  </label>
</div>

<!-- File Input -->
<div class="form-group">
  <label class="form-label" for="avatar">Profile Picture</label>
  <div class="input-file-wrapper">
    <input type="file" id="avatar" class="input-file" accept="image/*">
    <label for="avatar" class="input-file-button">
      <svg class="input-file-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
      </svg>
      <span class="input-file-text">Choose File</span>
    </label>
  </div>
</div>
```

## Accessibility Guidelines
1. **Touch Targets:** All inputs maintain minimum 44×44px touch target size
2. **Labels:** All inputs have proper associated labels
3. **Focus States:** Clear visual focus indicators with colored outlines
4. **Error Handling:** Clear error messages and visual error states
5. **Keyboard Navigation:** All inputs are keyboard accessible
6. **ARIA Attributes:** Use appropriate ARIA attributes for complex inputs

## Best Practices
1. **Clear Labels:** Use descriptive labels that clearly indicate the input's purpose
2. **Placeholder Text:** Use placeholders as hints, not replacements for labels
3. **Input Types:** Use appropriate HTML5 input types for better mobile keyboards
4. **Validation:** Provide immediate validation feedback when possible
5. **Group Related Inputs:** Use fieldsets and legends for related input groups
6. **Consistent Sizing:** Maintain consistent input sizes within forms