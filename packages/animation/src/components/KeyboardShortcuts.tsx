import { useState } from "react";

const shortcuts = [
  { key: "Delete / Backspace", description: "Xóa node/edge được chọn" },
  { key: "R", description: "Xoay node được chọn" },
  { key: "Space", description: "Đóng/mở van, damper" },
  { key: "Ctrl+D", description: "Nhân đôi node được chọn" },
  { key: "Ctrl+A", description: "Chọn tất cả nodes" },
  { key: "Escape", description: "Bỏ chọn tất cả" },
];

export default function KeyboardShortcuts() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <button
        className="keyboard-help-btn"
        onClick={() => setIsVisible(!isVisible)}
        title="Xem phím tắt"
      >
        ⌨️
      </button>

      {isVisible && (
        <div className="keyboard-shortcuts">
          <div className="keyboard-shortcuts-header">
            <h3>Phím tắt</h3>
            <button className="close-btn" onClick={() => setIsVisible(false)}>
              ×
            </button>
          </div>
          <div className="shortcuts-list">
            {shortcuts.map((shortcut, index) => (
              <div key={index} className="shortcut-item">
                <kbd className="key">{shortcut.key}</kbd>
                <span className="description">{shortcut.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
