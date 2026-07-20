import type { Editor } from '@tiptap/core'
import { useEditorState } from '@tiptap/react'
import {BubbleMenu as TiptapBubbleMenu} from "@tiptap/react/menus"
import { useRef } from 'react'

import { menuBarStateSelector } from './menuBarState.ts'

import { LuBold } from "react-icons/lu";
import { GoItalic } from "react-icons/go";
import { GoStrikethrough } from "react-icons/go";
import { PiParagraphLight } from "react-icons/pi";
import { PiListBulletsLight } from "react-icons/pi";
import { GrOrderedList } from "react-icons/gr";
import { IoCodeSlashOutline } from "react-icons/io5";
import { FaQuoteRight } from "react-icons/fa6";
import { CiImageOn } from "react-icons/ci";
import { GrUndo } from "react-icons/gr";
import { GrRedo } from "react-icons/gr";

export const BubbleMenu = ({ editor }: { editor: Editor }) => {
  const fileInputRef = useRef<HTMLInputElement>(null) // Ref for the hidden input

  const editorState = useEditorState({
    editor,
    selector: menuBarStateSelector,
  })

  if (!editor) {
    return null
  }

  // 2. Handle the image selection and insert into Tiptap
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0]
  if (!file) return

  try {
    // 1. Ask your backend server for a secure timestamp & signature hash
    const signResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/sign-cloudinary`);
    if (!signResponse.ok) {
      const errorText = await signResponse.text()
      console.error(`Backend failed (${signResponse.status}):`, errorText)
      return
    }
    const { signature, timestamp, apiKey, cloudName } = await signResponse.json()

    // 2. Build the Multi-part Form Payload
    const formData = new FormData()
    formData.append('file', file)
    formData.append('api_key', apiKey)
    formData.append('timestamp', timestamp)
    formData.append('signature', signature)

    // 3. Fire the request directly to Cloudinary's servers
    const cldResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    )

    if (!cldResponse.ok) {
      const errorText = await cldResponse.text()
      console.error(`Cloudinary failed (${cldResponse.status}):`, errorText)
      return
    }
    // if (!cldResponse.ok) throw new Error('Cloudinary upload failure')

    const data = await cldResponse.json()

    // 4. Update the rich text layout canvas with the remote link
    editor
      .chain()
      .focus()
      .setImage({ src: data.secure_url })
      .run()

  } catch (error) {
    console.error('Secure image upload sequence halted:', error)
  } finally {
    event.target.value = ''
  }
}

  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />
      <TiptapBubbleMenu editor={editor} className='button-group bg-white border-gray-300 border rounded-md'>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={editorState.isBold ? 'is-active' : ''}
        >
          <LuBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={editorState.isItalic ? 'is-active' : ''}
        >
          <GoItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className={editorState.isStrike ? 'is-active' : ''}
        >
          <GoStrikethrough />
        </button>
        {/* <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          className={editorState.isCode ? 'is-active' : ''}
        >
          Code
        </button> */}
        {/* <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>Clear marks</button> */}
        {/* <button onClick={() => editor.chain().focus().clearNodes().run()}>Clear nodes</button> */}
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editorState.isParagraph ? 'is-active' : ''}
        >
          <PiParagraphLight />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editorState.isHeading1 ? 'is-active' : ''}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editorState.isHeading2 ? 'is-active' : ''}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editorState.isHeading3 ? 'is-active' : ''}
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editorState.isHeading4 ? 'is-active' : ''}
        >
          H4
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={editorState.isHeading5 ? 'is-active' : ''}
        >
          H5
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={editorState.isHeading6 ? 'is-active' : ''}
        >
          H6
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editorState.isBulletList ? 'is-active' : ''}
        >
          <PiListBulletsLight />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editorState.isOrderedList ? 'is-active' : ''}
        >
          <GrOrderedList />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editorState.isCodeBlock ? 'is-active' : ''}
        >
          <IoCodeSlashOutline />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editorState.isBlockquote ? 'is-active' : ''}
        >
          <FaQuoteRight />
        </button>
        {/* 3. The new Image Button */}
        <button 
          onClick={triggerFileSelect} 
          title="Upload Image"
        >
          <CiImageOn />
        </button>
        <button onClick={() => editor.chain().focus().undo().run()} disabled={!editorState.canUndo}>
          <GrUndo />
        </button>
        <button onClick={() => editor.chain().focus().redo().run()} disabled={!editorState.canRedo}>
          <GrRedo />
        </button>
      </TiptapBubbleMenu>
    </>
  )
}