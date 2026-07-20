import { useParams, useNavigate } from 'react-router-dom';
import Tiptap from '../../components/tiptap';
import { useEffect, useState } from 'react';
import { useSidebar } from '../../context/SidebarContext';
import { useAuth } from '../../context/AuthContext';
import { useDrafts, type DraftType } from '../../context/DraftContext';

const WriteStoryPage = () => {
  const { user } = useAuth();
  const { saveDraft, draft, upload_Draft, setDraft } = useDrafts();
  const { id } = useParams() || null;
  
  // Track the live editor instance directly
  const [activeEditor, setActiveEditor] = useState<any>(null);
  const [content, setContent] = useState<string>("");

  const navigate = useNavigate();
  const { setOpen } = useSidebar();

  useEffect(() => {
    setOpen(false);
  }, [setOpen]);

  const submit = async () => {
  console.log("Your story has been submitted for publishing...");
  const liveContent = activeEditor ? activeEditor.getHTML() : content; 
  let finalDraft: DraftType;
  console.log("Content detected:", liveContent);

  if (id) {
    const existingDraft = draft.find((d) => d.id == id);
    if (existingDraft) {
      finalDraft = {
        ...existingDraft,
        content: liveContent, 
        upload_date: new Date().toISOString().split("T")[0]
      };
    } else {
      finalDraft = {
        id: id,
        user_id: user?.id || 1,
        content: liveContent,
        username: user?.username || "",
        user_avatar: user?.user_avatar || "https://github.com/evilrabbit.png",
        upload_date: new Date().toISOString().split("T")[0]
      };
    }
  } else {
    finalDraft = {
      id: crypto.randomUUID(),
      user_id: user?.id || 1,
      content: liveContent,
      username: user?.username || "",
      user_avatar: user?.user_avatar || "https://github.com/evilrabbit.png",
      upload_date: new Date().toISOString().split("T")[0]
    };
  }

  const allGlobalDrafts: DraftType[] = JSON.parse(localStorage.getItem("drafts") || "[]");
  const cleanGlobalDrafts = allGlobalDrafts.filter((gDraft) => gDraft.id !== finalDraft.id);
  localStorage.setItem('drafts', JSON.stringify(cleanGlobalDrafts));

  const updatedLocalDrafts = draft.filter((d) => d.id !== finalDraft.id);
  setDraft(updatedLocalDrafts);

  try {
    await upload_Draft(finalDraft);
    navigate('/stories');
  } catch (error) {
    console.error("Failed to submit story:", error);
  }
};

  const save = async () => {
    // Read the content straight out of the DOM/Editor model synchronously
    const liveContent = activeEditor ? activeEditor.getHTML() : content;
    let finalDraft: DraftType;
    
    if (id) {
      const existingDraft = draft.find((d) => d.id == id);

      if (existingDraft) {
        finalDraft = {
          ...existingDraft,
          content: liveContent, 
          upload_date: new Date().toISOString().split("T")[0]
        };
      } else {
        finalDraft = {
          id: id,
          user_id: user?.id || 1,
          content: liveContent,
          username: user?.username || "",
          user_avatar: user?.user_avatar || "https://github.com/evilrabbit.png",
          upload_date: new Date().toISOString().split("T")[0]
        };
      }
    } else {
      finalDraft = {
        id: crypto.randomUUID(),
        user_id: user?.id || 1,
        content: liveContent,
        username: user?.username || "",
        user_avatar: user?.user_avatar || "https://github.com/evilrabbit.png",
        upload_date: new Date().toISOString().split("T")[0]
      };
    }

    // Await or chain the update process securely to prevent context dropouts before layout changes
    if (id) {
      await saveDraft(finalDraft, true);
    } else {
      await saveDraft(finalDraft, false);
    }
    
    navigate("/stories");
  };

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center pt-[10vh] relative">
      <Tiptap 
        updateProps={setContent} 
        onReady={setActiveEditor} 
        draft_id={id || undefined} 
      />
      <div className='flex gap-x-3 fixed bottom-5 right-5 z-50'>
        <button onClick={save} className='px-6 py-1 border rounded-2xl hover:cursor-pointer bg-white shadow-sm'>Save</button>
        <button onClick={submit} className='px-6 py-1 border rounded-2xl hover:cursor-pointer bg-green-700 text-white shadow-sm'>Submit</button>
      </div>
    </div>
  );
};

export default WriteStoryPage;