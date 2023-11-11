import { addScriptToHtml } from '~/utils/pureFunction'

export const useConfetti = () => {
  const scriptUrl = 'https://cdn.jsdelivr.net/npm/js-confetti@latest/dist/js-confetti.browser.js'

  const run = () => {
    addScriptToHtml(scriptUrl).then(() => {
      const jsConfetti = (new JSConfetti())
      jsConfetti.addConfetti()
    })
  }

  return {
    run,
  }
}
