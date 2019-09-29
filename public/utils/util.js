export function renderBase(root) {
    const header = document.createElement('header');
    header.className = 'header';

    const mainContent = document.createElement('div');
    mainContent.className = 'main-content';
    const rightColumn = document.createElement('div');
    rightColumn.className = 'right-column';
    const leftColumn = document.createElement('div');
    leftColumn.className = 'left-column';

    mainContent.appendChild(leftColumn);
    mainContent.appendChild(rightColumn);

    root.appendChild(header);
    root.appendChild(mainContent);
}