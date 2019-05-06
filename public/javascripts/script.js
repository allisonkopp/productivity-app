// const toolbarOptions = [
//   ['bold', 'italic', 'underline', 'strike'], // toggled buttons
//   ['blockquote', 'code-block'],

//   [{ header: 1 }, { header: 2 }], // custom button values
//   [{ list: 'ordered' }, { list: 'bullet' }],
//   [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
//   [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
//   [{ direction: 'rtl' }], // text direction

//   [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
//   [{ header: [1, 2, 3, 4, 5, 6, false] }],

//   [{ color: [] }, { background: [] }], // dropdown with defaults from theme
//   [{ font: [] }],
//   [{ align: [] }],

//   ['clean'] // remove formatting button
// ];

// const options = {
//   debug: 'info',
//   modules: {
//     toolbar: toolbarOptions
//   },
//   placeholder: 'Compose an epic...',
//   readOnly: false,
//   theme: 'snow'
// };
// const editor = new Quill('#editor', options);

// const Delta = Quill.import('delta');

// const saveNote = _ => {
//   let change = new Delta();
//   editor.on('text-change', delta => {
//     change = change.compose(delta);
//   });
// };

// const stickeyNote = document.getElementById('stickey-note');
// const dragElement = element => {
//   const dragMouseDown = e => {
//     e = e || window.event;
//     e.preventDefault();
//     // get the mouse cursor position at startup:
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     document.onmouseup = closeDragElement;
//     // call a function whenever the cursor moves:
//     document.onmousemove = elementDrag;
//   };

//   const elementDrag = e => {
//     e = e || window.event;
//     e.preventDefault();
//     // calculate the new cursor position:
//     pos1 = pos3 - e.clientX;
//     pos2 = pos4 - e.clientY;
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     // set the element's new position:
//     element.style.top = element.offsetTop - pos2 + 'px';
//     element.style.left = element.offsetLeft - pos1 + 'px';

//     let pos1 = 0,
//       pos2 = 0,
//       pos3 = 0,
//       pos4 = 0;
//     if (document.getElementById('stickey-header')) {
//       // if present, the header is where you move the DIV from:
//       document.getElementById('sticky-header').onmousedown = dragMouseDown;
//     } else {
//       // otherwise, move the DIV from anywhere inside the DIV:
//       element.onmousedown = dragMouseDown;
//     }
//   };

//   const closeDragElement = _ => {
//     // stop moving when mouse button is released:
//     document.onmouseup = null;
//     document.onmousemove = null;
//   };
// };

// dragElement(stickeyNote);
