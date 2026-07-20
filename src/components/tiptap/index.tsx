import './styles.scss'

import { TextStyleKit } from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
// import Image from '@tiptap/extension-image';
import Image from '@tiptap/extension-image';
import { useDrafts } from '../../context/DraftContext.tsx'
import { useEffect, useRef } from 'react'

import { BubbleMenu } from './TiptapBubbleMenu.tsx'

const extensions = [
  TextStyleKit,
   StarterKit,
   Image.configure({
    resize: {
          enabled: false,
          alwaysPreserveAspectRatio: false,
          minWidth: 50,
          minHeight: 50,
        },
   })
]

interface TiptapProps {
  draft_id?: string
  // Pass the editor instance back up so the page can read it synchronously on click
  onReady?: (editorInstance: any) => void 
  updateProps?: (content: string) => void
}

const Tiptap = ({ draft_id, onReady, updateProps }: TiptapProps) => {
  const { draft } = useDrafts()
  const currentDraft = draft.find((draft) => draft.id == draft_id)
  
  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class: "focus:outline-none focus:whitespace-pre-wrap whitespace-pre-wrap"
      }
    },
    content: currentDraft ? currentDraft.content : `<h1>Title</h1>`,
    onUpdate: ({ editor }) => {
      updateProps?.(editor.getHTML())
    },
  })

  // Pass the editor up to the parent page once initialized
  useEffect(() => {
    if (editor) {
      onReady?.(editor)
    }
  }, [editor, onReady])

  // Track the draft ID, resetting the lock if the actual ID changes
  const hasLoadedRef = useRef<string | null>(null)

  useEffect(() => {
    if (editor && currentDraft) {
      if (hasLoadedRef.current !== currentDraft.id) {
        editor.commands.setContent(currentDraft.content)
        hasLoadedRef.current = currentDraft.id
        updateProps?.(currentDraft.content)
      }
    }
  }, [editor, currentDraft, draft_id])

  if (draft_id && draft.length === 0) {
    return <div className="p-4 text-center">Loading draft...</div>
  }

  return (
    <div className='w-full h-full prose max-w-none flex flex-col items-center'>
      <EditorContent className='w-[80%] h-full px-2 overflow-y-scroll' editor={editor} />
      <BubbleMenu editor={editor} />
    </div>
  )
}

export default Tiptap;