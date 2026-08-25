<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Temperature Converter - README</title>
</head>
<body>

<h1>🌡️ Temperature Converter</h1>

<p>An interactive web tool to convert temperature values between <strong>Celsius</strong>, <strong>Fahrenheit</strong>, and <strong>Kelvin</strong>, with real-time input validation and edge-case handling for physically impossible temperatures (below absolute zero).</p>

<p>Built with <strong>HTML5, CSS3, and Vanilla JavaScript</strong> — no frameworks or libraries required.</p>

<hr>

<h2>✨ Features</h2>
<ul>
  <li><strong>Numeric input validation</strong> — rejects non-numeric input and shows a clear error message</li>
  <li><strong>Unit selector</strong> — choose the input unit (Celsius / Fahrenheit / Kelvin) via dropdown</li>
  <li><strong>Simultaneous output</strong> — see the converted value in all three units at once</li>
  <li><strong>Convert button</strong> — triggers the calculation on click (with optional live/auto-conversion as you type)</li>
  <li><strong>Result display</strong> — clearly labeled result cards with correct unit symbols (°C, °F, K)</li>
  <li><strong>Absolute zero handling</strong> — displays a friendly warning if the entered value is below the physical limit:
    <ul>
      <li>Celsius: below <strong>-273.15°C</strong></li>
      <li>Fahrenheit: below <strong>-459.67°F</strong></li>
      <li>Kelvin: below <strong>0K</strong></li>
    </ul>
  </li>
  <li><strong>Quick presets</strong> — one-click buttons for common temperatures</li>
  <li><strong>Clean, centered UI</strong> — simple, responsive layout with clear labels</li>
</ul>

<hr>

<h2>🧮 Conversion Formulas</h2>
<table border="1" cellpadding="8" cellspacing="0">
  <tr><th>From → To</th><th>Formula</th></tr>
  <tr><td>Celsius → Fahrenheit</td><td><code>(C × 9/5) + 32</code></td></tr>
  <tr><td>Fahrenheit → Celsius</td><td><code>(F − 32) × 5/9</code></td></tr>
  <tr><td>Celsius → Kelvin</td><td><code>C + 273.15</code></td></tr>
  <tr><td>Kelvin → Celsius</td><td><code>K − 273.15</code></td></tr>
  <tr><td>Fahrenheit → Kelvin</td><td><code>(F − 32) × 5/9 + 273.15</code></td></tr>
  <tr><td>Kelvin → Fahrenheit</td><td><code>(K − 273.15) × 9/5 + 32</code></td></tr>
</table>

<hr>

<h2>📁 Project Structure</h2>
<pre>
temperature-converter/
├── index.html      (Markup and page structure)
├── styles.css       (Styling and layout)
├── script.js         (Conversion logic, validation, and event handling)
└── README.md
</pre>

<hr>

<h2>🚀 Getting Started</h2>
<p>No build tools or dependencies needed.</p>
<ol>
  <li>Clone the repository:
    <pre>git clone https://github.com/&lt;your-username&gt;/temperature-converter.git</pre>
  </li>
  <li>Open <code>index.html</code> in your browser.</li>
</ol>
<p>That's it — the app runs entirely client-side.</p>

<hr>

<h2>🛠️ Tech Stack</h2>
<ul>
  <li>HTML5</li>
  <li>CSS3</li>
  <li>Vanilla JavaScript (ES6+)</li>
</ul>

<hr>

<h2>📌 Notes</h2>
<p>This project was built as part of a Web Technologies coursework assignment, focusing on:</p>
<ul>
  <li>DOM manipulation and event handling</li>
  <li>Client-side input validation</li>
  <li>Real-world edge-case handling (physical temperature limits)</li>
</ul>

<hr>

<h2>📄 License</h2>
<p>This project is open source and available for educational use.</p>

</body>
</html>
