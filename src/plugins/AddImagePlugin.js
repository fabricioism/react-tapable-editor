import { AtomicBlockUtils } from 'draft-js'
import focus from '../decorators/focus'
import alignment from '../decorators/alignment'
import Image from '../components/image'

const DecoratedImage = alignment(focus(Image))

function AddImagePlugin() {
  this.apply = (getEditor) => {
    const { hooks } = getEditor();

    hooks.addImage.tap('AddImagePlugin', (editorState, file) => {
      const { src } = file || {}
      if (!src) return
      const entityType = 'IMAGE';
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        entityType,
        'IMMUTABLE',
        {
          src,
          alignment: 'center',
        },
      );
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        ' ',
      );

      hooks.setState.call(newEditorState)
    });

    hooks.blockRendererFn.tap('AddImagePlugin', (contentBlock, editorState) => {
      if (contentBlock.getType() === 'atomic') {
        const contentState = editorState.getCurrentContent();
        const entity = contentBlock.getEntityAt(0);
        if (!entity) return null;
        const type = contentState.getEntity(entity).getType();
        if (type === 'IMAGE') {
          return {
            component: DecoratedImage,
            editable: false,
            props: {
              getEditor,
            }
          };
        }
      }
    });
  };
}

export default AddImagePlugin