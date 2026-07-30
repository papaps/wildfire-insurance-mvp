// Rendered through a real story (not raw MDX) so the wf- classes below apply
// as they do in the app, instead of being overridden by Storybook's docs
// prose typography.
export default {
  title: 'Foundations/Colors',
}

const swatches = [
  { name: '--wf-bg', value: 'var(--wf-bg)', hex: '#fcfcfb', usage: 'Screen background' },
  { name: '--wf-teal', value: 'var(--wf-teal)', hex: '#004040', usage: 'Primary text, icons, borders' },
  { name: '--wf-teal-60', value: 'var(--wf-teal-60)', hex: 'rgba(0,64,64,.6)', usage: 'Secondary text, inactive tabs' },
  { name: '--wf-teal-20', value: 'var(--wf-teal-20)', hex: 'rgba(0,64,64,.2)', usage: 'Dividers, progress track' },
  { name: '--wf-teal-10', value: 'var(--wf-teal-10)', hex: 'rgba(0,64,64,.1)', usage: 'Assistant chat bubble fill' },
  { name: '--wf-teal-06', value: 'var(--wf-teal-06)', hex: 'rgba(0,64,64,.06)', usage: 'Subtle card/hover fill' },
  { name: '--wf-teal-15 (fallback)', value: 'rgba(0, 64, 64, 0.15)', hex: 'rgba(0,64,64,.15)', usage: 'Card & input borders' },
  { name: '--wf-orange', value: 'var(--wf-orange)', hex: '#de7356', usage: 'CTAs, active states, accents' },
  { name: '--wf-red', value: 'var(--wf-red)', hex: '#c0392b', usage: 'Destructive actions, errors' },
]

export const Palette = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
      {swatches.map((s) => (
        <div
          key={s.name}
          style={{ border: '1px solid rgba(0,64,64,0.15)', borderRadius: 10, overflow: 'hidden', fontFamily: 'var(--wf-sans)' }}
        >
          <div style={{ height: 64, background: s.value }} />
          <div style={{ padding: '10px 12px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--wf-teal)' }}>{s.name}</div>
            <div style={{ fontSize: 11, color: '#6b6b6b', marginTop: 2 }}>{s.hex}</div>
            <div style={{ fontSize: 11, color: '#6b6b6b', marginTop: 4 }}>{s.usage}</div>
          </div>
        </div>
      ))}
    </div>
  ),
}
