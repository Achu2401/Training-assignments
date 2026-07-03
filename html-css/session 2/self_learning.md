# Self-Learning Checkpoint

## 1. What is the difference between `px`, `rem`, and `%`?

- **`px` (pixels):** A fixed unit. The size remains constant regardless of screen size or parent elements.
- **`rem` (root em):** A relative unit based on the root (`html`) font size. Useful for scalable and accessible designs.
- **`%` (percentage):** A relative unit based on the size of the parent element. Commonly used for responsive layouts.

---

## 2. What does `display: flex` do?

`display: flex` turns an element into a **flex container**, allowing its direct child elements to be arranged in a flexible row or column with easy alignment and spacing.

---

## 3. What is the difference between `justify-content` and `align-items` in Flexbox?

- **`justify-content`** aligns items along the **main axis** (horizontal by default).
- **`align-items`** aligns items along the **cross axis** (vertical by default).

---

## 4. What does `1fr` mean in CSS Grid?

`1fr` means **one fraction of the available free space** inside a CSS Grid container. It allows columns or rows to share the remaining space proportionally.

---

## 5. What is mobile-first design and why is it preferred?

Mobile-first design means writing the base CSS for **small screens first**, then adding styles for larger screens using `min-width` media queries.

It is preferred because:
- It improves performance on mobile devices.
- It creates a better user experience on smaller screens.
- It makes responsive design easier to build and maintain.

---

## 6. What does the viewport meta tag do?

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

This tag tells the browser to match the page width to the device width, ensuring responsive layouts display correctly on mobile devices.

---

## 7. Why does every page need `img { max-width: 100%; }`?

```css
img {
  max-width: 100%;
  height: auto;
}
```

- **`max-width: 100%`** prevents images from overflowing their container.
- **`height: auto`** maintains the image's original aspect ratio while resizing.

Together, they ensure images remain responsive across different screen sizes.