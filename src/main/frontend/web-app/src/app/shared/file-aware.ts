/**
 * Common logging class to extend.
 */
export class FileAware {

  constructor(private className: string) {
  }

  log(...args: any[]) {
    console.log(`${this.className}:`, ...args)
  }

  logMethod(methodName: string, ...args: any[]) {
    const spacer = args && args.length > 0 ? ' --- ' : ''

    console.log(`${this.className}.${methodName}${spacer}`, ...args)
  }

  logTable(tableName: string, data: any[]) {
    console.groupCollapsed(`${this.className}.${tableName}`)
    console.table(data)
    console.groupEnd()
  }

  logGroup(groupName: string, ...args: any) {
    console.groupCollapsed(`${this.className}.${groupName}`)
    console.log(...args)
    console.groupEnd()
  }
}
