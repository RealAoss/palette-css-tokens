function fail(message) {
    throw new Error(message);
}
const lines = text => text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
export function transform(s) {
    if (!s.trim()) fail('Enter some source text.');
    const seen = new Set;
    const entries = lines(s).map(l => {
        const m = l.match(/^([a-z][a-z0-9-]*)\s*=\s*(#[0-9a-fA-F]{6})$/);
        if (!m || seen.has(m[1])) fail('Use unique lowercase names and six hex digits');
        seen.add(m[1]);
        return '  --' + m[1] + ': ' + m[2] + ';'
    });
    return ':root {\n' + entries.join('\n') + '\n}'
}
