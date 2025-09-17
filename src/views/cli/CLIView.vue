<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">Command Line Interface</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="terminal">
          <v-card-text class="terminal-output">
            <div v-for="(line, index) in output" :key="index" class="terminal-line">
              {{ line }}
            </div>
            <div class="terminal-input">
              <span class="prompt">$</span>
              <input
                v-model="command"
                @keyup.enter="executeCommand"
                type="text"
                placeholder="Enter command..."
                ref="commandInput"
              >
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Common Commands</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="cmd in commonCommands" :key="cmd.command">
                <v-list-item-title>{{ cmd.command }}</v-list-item-title>
                <template v-slot:append>
                  <v-btn
                    size="small"
                    variant="text"
                    @click="insertCommand(cmd.command)"
                  >
                    Use
                  </v-btn>
                </template>
                <v-list-item-subtitle>{{ cmd.description }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Command History</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="(cmd, index) in commandHistory" :key="index">
                <v-list-item-title>{{ cmd }}</v-list-item-title>
                <template v-slot:append>
                  <v-btn
                    size="small"
                    variant="text"
                    @click="insertCommand(cmd)"
                  >
                    Reuse
                  </v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const command = ref('')
const output = ref(['Welcome to Network Management CLI', 'Type "help" for available commands'])
const commandHistory = ref([])
const commandInput = ref(null)

const commonCommands = [
  { command: 'show status', description: 'Display system status' },
  { command: 'show interfaces', description: 'List network interfaces' },
  { command: 'show policies', description: 'Display active policies' },
  { command: 'clear stats', description: 'Clear statistics' }
]

function executeCommand() {
  if (!command.value) return

  output.value.push(`$ ${command.value}`)
  commandHistory.value.unshift(command.value)

  // TODO: Implement actual command execution
  output.value.push(`Executing: ${command.value}`)
  output.value.push('Command executed successfully')

  command.value = ''
  scrollToBottom()
}

function insertCommand(cmd) {
  command.value = cmd
  commandInput.value?.focus()
}

function scrollToBottom() {
  setTimeout(() => {
    const terminal = document.querySelector('.terminal-output')
    if (terminal) {
      terminal.scrollTop = terminal.scrollHeight
    }
  }, 0)
}
</script>

<style scoped>
.terminal {
  background-color: #1e1e1e;
  color: #ffffff;
  font-family: monospace;
}

.terminal-output {
  height: 400px;
  overflow-y: auto;
  padding: 16px;
}

.terminal-line {
  white-space: pre-wrap;
  line-height: 1.5;
}

.terminal-input {
  display: flex;
  align-items: center;
  margin-top: 8px;
}

.prompt {
  color: #00ff00;
  margin-right: 8px;
}

input {
  background: transparent;
  border: none;
  color: #ffffff;
  flex-grow: 1;
  font-family: monospace;
  outline: none;
}

input::placeholder {
  color: #666666;
}
</style> 