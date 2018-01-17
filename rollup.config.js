import buble from 'rollup-plugin-buble'

export default {
  input: 'src/index.js',
  plugins: [
    buble({objectAssign: 'Object.assign'})
  ],
  output: [
    {
      format: 'cjs',
      file: 'dist/index.js'
    },
    {
      format: 'es',
      file: 'dist/index.es.js'
    }
  ]
}
