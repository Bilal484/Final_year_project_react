# React Icons Replacement Guide

This document provides guidance for replacing FontAwesome and Bootstrap icons with React Icons throughout your project.

## Getting Started

React Icons is already installed in your project. It includes icons from multiple libraries:

- FontAwesome (fa)
- Material Design icons (md)
- Bootstrap Icons (bs)
- Heroicons (hi)
- And many more

## Common Icon Replacements

### FontAwesome to React Icons

| FontAwesome | React Icons |
|-------------|-------------|
| `<i className="fas fa-user"></i>` | `<FaUser />` |
| `<i className="fas fa-envelope"></i>` | `<FaEnvelope />` |
| `<i className="fas fa-lock"></i>` | `<FaLock />` |
| `<i className="fas fa-eye"></i>` | `<FaEye />` |
| `<i className="fas fa-eye-slash"></i>` | `<FaEyeSlash />` |
| `<i className="fas fa-check-circle"></i>` | `<FaCheckCircle />` |
| `<i className="fas fa-arrow-right"></i>` | `<FaArrowRight />` |
| `<i className="fas fa-arrow-left"></i>` | `<FaArrowLeft />` |
| `<i className="fab fa-google"></i>` | `<FaGoogle />` |
| `<i className="fab fa-facebook-f"></i>` | `<FaFacebookF />` |
| `<i className="fab fa-apple"></i>` | `<FaApple />` |
| `<i className="fas fa-user-tag"></i>` | `<FaUserTag />` |
| `<i className="fas fa-home"></i>` | `<FaHome />` |
| `<i className="fas fa-tags"></i>` | `<FaTags />` |
| `<i className="fas fa-chart-line"></i>` | `<FaChartLine />` |
| `<i className="fas fa-key"></i>` | `<FaKey />` |
| `<i className="fas fa-question-circle"></i>` | `<FaQuestionCircle />` |
| `<i className="fas fa-cloud-upload-alt"></i>` | `<FaCloudUploadAlt />` |

### Bootstrap Icons to React Icons

| Bootstrap Icons | React Icons |
|----------------|-------------|
| `<i className="bi bi-person"></i>` | `<BsPerson />` |
| `<i className="bi bi-envelope"></i>` | `<BsEnvelope />` |
| `<i className="bi bi-lock"></i>` | `<BsLock />` |
| `<i className="bi bi-eye"></i>` | `<BsEye />` |
| `<i className="bi bi-eye-slash"></i>` | `<BsEyeSlash />` |
| `<i className="bi bi-check-circle"></i>` | `<BsCheckCircle />` |
| `<i className="bi bi-arrow-right"></i>` | `<BsArrowRight />` |
| `<i className="bi bi-arrow-left"></i>` | `<BsArrowLeft />` |

## Steps to Replace Icons

1. Import the required icons at the top of your component file:
   ```jsx
   import { FaUser, FaEnvelope, FaLock /* other icons you need */ } from "react-icons/fa";
   import { BsPerson, BsEnvelope /* other bootstrap icons */ } from "react-icons/bs";
   ```

2. Replace the HTML icon elements with the React Icon components:
   ```jsx
   // Old FontAwesome
   <i className="fas fa-user"></i>
   
   // New React Icons
   <FaUser />
   ```

3. For conditional rendering or dynamic icons:
   ```jsx
   // Old way
   <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
   
   // New way with React Icons
   {showPassword ? <FaEyeSlash /> : <FaEye />}
   ```

4. You can customize the size, color, and other properties:
   ```jsx
   <FaUser size={24} color="blue" />
   ```

## Finding All Icon Usages

You can search for usage of FontAwesome icons with:
```
grep -r "fa-" --include="*.jsx" --include="*.js" src/
```

And for Bootstrap Icons:
```
grep -r "bi-" --include="*.jsx" --include="*.js" src/
```

## Benefits of Using React Icons

- Improved performance (tree-shakeable)
- Easier styling and size control
- Better TypeScript support
- Consistent rendering across browsers
- Reduced bundle size compared to full icon libraries
