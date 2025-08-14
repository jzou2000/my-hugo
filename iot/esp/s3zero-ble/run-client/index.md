---
title: Run Web Client
---


<div id="jjs3mini-client">
    <style src="style.css"></style>
    <div class="container">
        <div class="panel" id="connection-panel">
            <h2>Connect to jjS3mini</h2>
            <div class="input-group">
                <label for="name-filter">Name Filter (Prefix):</label>
                <input type="text" id="name-filter" placeholder="e.g., jjS3mini">
            </div>
            <button id="scan-button">Scan</button>
            <div id="scan-results"></div>
            <button id="connect-button" disabled>Connect</button>
        </div>
        <div class="panel" id="client-panel" style="display: none;">
            <h2>jjS3mini Controls</h2>
            <div class="control-group">
                <label>Temperature: <span id="temperature">N/A</span> °C</label>
            </div>
            <div class="control-group">
                <label>LED Controls:</label>
                <div class="switch-group">
                    <label><input type="checkbox" id="red-switch"> Red</label>
                    <label><input type="checkbox" id="green-switch"> Green</label>
                    <label><input type="checkbox" id="blue-switch"> Blue</label>
                </div>
            </div>
            <div class="control-group">
                <label for="cycle-slider">Cycle (seconds): <span id="cycle-value">0</span></label>
                <input type="range" id="cycle-slider" min="0" max="5" step="1" value="0">
            </div>
            <div class="control-group">
                <label for="duty-slider">Duty Cycle (%): <span id="duty-value">100</span></label>
                <input type="range" id="duty-slider" min="0" max="100" step="1" value="100">
            </div>
        </div>
    </div>
    <script src="app.js"></script>
</div>
