export function storybookPlugin(options) {
    const INDEX_HTML = options.base + '/index.html';
    console.log('plugin lopaded');
    return {
        name: 'storybook-vite',

        resolveId(source, importer, opts, ssr) {
            console.log('try to resolve', source);
            if (source === INDEX_HTML) {
              
              return INDEX_HTML;
            }
          },


          resolve(id) {
              console.log('in her', id);
          },


        load(id) {
            if (id === INDEX_HTML) {
                return 'this is our html';
            }
        }
    }
}
