'use client'

import { DoneOutlined } from "@mui/icons-material";
import CreatableSelect from 'react-select/creatable';
import { marked } from "marked";
import { useState } from "react";

export default function PageClient({ draft }) {
  const [content, setContent] = useState(draft.content);
  const [saveState, setSaveState] = useState(null);
  const [publishState, setPublishState] = useState(null);
  const [selectedTags, setSelectedTags] = useState(draft.tags.map(tag => ({ value: tag, label: tag })));

  async function saveDraft(form) {
    setSaveState('saving')
    await fetch(`/api/drafts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        draftId: draft._id,
        title: form.title.value,
        description: form.description.value,
        tags: selectedTags.map(tag => tag.value),
        content: form.content.value
      })
    })

    setSaveState('saved')
    setTimeout(() => {
      setSaveState(null)
    }, 2000);
  }

  async function publishDraft(form) {
    setPublishState('publishing')

    await fetch(`/api/posts`, {
      method: 'PUT',
      body: JSON.stringify({
        title: form.title.value,
        description: form.description.value,
        tags: selectedTags.map(tag => tag.value),
        content: form.content.value,
      }),
    }).then(res => res.json())
      .then(async data => {
        await fetch(`/api/drafts?draftId=${draft._id}`, { method: 'DELETE' });
        window.location.href = '/published';
      })

    setPublishState('published')
    setTimeout(() => {
      setPublishState(null)
    }, 1000)
  }

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        e.nativeEvent.submitter.id === 'save-draft' ? saveDraft(e.target) : publishDraft(e.target)
      }}>
        {/* Metadata inputs */}
        <div className="grid grid-cols-2 gap-4">
          <section className="h-full flex flex-col">
            <div className="mb-4">
              <label htmlFor="title" className="text-sm dark:text-white tracking-wider">Blog title</label>
              <input type="text" id="title" name="title" required defaultValue={draft.title}
                className="py-2 px-3 block w-full border-gray-200 rounded-md text-sm focus:outline-none border dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" />
            </div>
            <div>
              <label htmlFor="tags" className="text-sm dark:text-white tracking-wider">Blog tags</label>
              <CreatableSelect value={selectedTags} onChange={newSelected => setSelectedTags(newSelected)} options={[]} isMulti isClearable isSearchable
                name='tags' styles={{
                  control: (provided, state) => ({
                    ...provided,
                    border: '1px solid #374151',
                    borderRadius: '0.375rem',
                    backgroundColor: '#0f172a',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'text',

                    '&:hover': {
                      borderColor: '#374151',
                    },

                    '&:focus': {
                      outline: 'none',
                    }
                  }),
                }} />
            </div>
          </section>
          <section className="h-full flex flex-col">
            <label htmlFor="description" className="text-sm dark:text-white tracking-wider">Blog description</label>
            <textarea type="text" id="description" name="description" required defaultValue={draft.description}
              className="py-2 px-3 block w-full h-full border-gray-200 rounded-md text-sm focus:outline-none border dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" />
          </section>
        </div>

        {/* Content input */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <section className="h-full flex flex-col">
            <label htmlFor="content" className="text-sm dark:text-white tracking-wider">Blog content</label>
            <textarea id="content" name="content" required defaultValue={draft.content}
              onChange={e => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 5 + 'px';
                setContent(e.target.value)
              }}
              className="py-2 px-3 block w-full border-gray-200 rounded-md text-sm focus:outline-none border dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" />
          </section>
          <section className="h-full flex flex-col">
            <div dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
              className="prose max-w-[1000px] dark:prose-invert" />
          </section>
        </div>

        {/* Form handling */}
        <div className="flex flex-row justify-center mt-8">
          <button type="submit" id='save-draft'
            className="py-2 px-4 mx-3 capitalize flex flex-row items-center rounded-md border border-blue-500 font-semibold text-blue-500 hover:text-white hover:bg-blue-500 focus:outline-none transition-all text-sm">
            {saveState === null && 'Save draft'}
            {saveState === 'saving' && <>
              <span class="mr-2 animate-spin inline-block w-4 h-4 border-[2px] border-current border-t-transparent text-inherit rounded-full" aria-label="loading"></span>
              Saving draft
            </>}
            {saveState === 'saved' && <>
              <DoneOutlined className="mr-2" /> Saved
            </>}
          </button>
          <button type="submit" id='publish-draft'
            className="py-2 px-4 mx-3 capitalize flex flex-row items-center rounded-md border border-green-500 font-semibold text-green-500 hover:text-white hover:bg-green-500 focus:outline-none transition-all text-sm">
            {publishState === null && 'Publish draft'}
            {publishState === 'publishing' && <>
              <span class="mr-2 animate-spin inline-block w-4 h-4 border-[2px] border-current border-t-transparent text-inherit rounded-full" aria-label="loading"></span>
              Saving draft
            </>}
            {publishState === 'published' && <>
              <DoneOutlined className="mr-2" /> Published
            </>}
          </button>
        </div>
      </form>
    </div>
  )
}