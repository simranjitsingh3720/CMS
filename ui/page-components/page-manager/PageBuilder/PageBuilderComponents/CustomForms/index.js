function CustomTemplates({ editor, data }) {
  if (editor) {
    editor.DomComponents.addType('form-modal', {
      view: {
        events: {
          dblclick: 'onActive',
        },

        onActive(ev) {
          const pfx = editor.getConfig().stylePrefix;
          const modal = editor.Modal;

          const container = document.createElement('div');
          modal.setTitle('Data Table');

          function btnClick(link) {
            editor.addComponents(`<div>

            <iframe src="${process.env.NEXT_PUBLIC_APP_LIVE_URL}/form/${link}?embed=true" title=undefined style="margin:0;padding:0" frameBorder="0" width="80%" height="490vh" ></iframe>
              </div>`);

            modal.close();
          }
          ((data && data.list) || []).map((page) => {
            const btnEdit = document.createElement('button');
            btnEdit.innerHTML = page.title;
            btnEdit.className = `${pfx}btn-prim ${pfx}btn-import`;
            btnEdit.style.margin = '20px 20px';
            btnEdit.style.height = '80px';
            btnEdit.style.width = '100px';
            btnEdit.onclick = function () { btnClick(page.id); };
            container.appendChild(btnEdit);
          });

          modal.setContent(container);
          modal.open();
        },
      },
    });
  }
  return (
    <div />
  );
}

export default CustomTemplates;
