export function messageBox(message, type = 'info') {
  const content = document.createElement('div');

  switch (type) {
    case 'validation':
      content.className = 'validation';
      break;
    case 'info':
      content.className = 'info';
      break;
    case 'success':
      content.className = 'success';
      break;
    case 'warning':
      content.className = 'warning';
      break;
    case 'error':
      content.className = 'error';
      break;
    default:
      content.className = '';
      break;
  }

  content.textContent = message;
  return content;
}
