/**
 * LS-8 v2.0 emulator skeleton code
 */

/**
 * Class for simulating a simple Computer (CPU & memory)
 */
const ADD = 0b10101000;
const AND = 0b10110011;
const DIV = 0b10101011;
const LDI = 0b10011001;
const MUL = 0b10101010;
const PRN = 0b01000011;
const HLT = 0b00000001;

class CPU {

    /**
     * Initialize the CPU
     */
    constructor(ram) {
        this.ram = ram;

        this.reg = new Array(8).fill(0); // General-purpose registers R0-R7
        
        // Special-purpose registers
        this.reg.PC = 0; // Program Counter
    }
	
    /**
     * Store value in memory address, useful for program loading
     */
    poke(address, value) {
        this.ram.write(address, value);
    }

    /**
     * Starts the clock ticking on the CPU
     */
    startClock() {
        this.clock = setInterval(() => {
            this.tick();
        }, 1); // 1 ms delay == 1 KHz clock == 0.000001 GHz
    }

    /**
     * Stops the clock
     */
    stopClock() {
        clearInterval(this.clock);
    }

    /**
     * ALU functionality
     *
     * The ALU is responsible for math and comparisons.
     *
     * If you have an instruction that does math, i.e. MUL, the CPU would hand
     * it off to it's internal ALU component to do the actual work.
     *
     * op can be: ADD SUB MUL DIV INC DEC CMP
     */
    alu(op, regA, regB) {
        switch (op) {
            case 'MUL':
            // !!! IMPLEMENT ME
                
                this.reg[regA] = this.reg[regA] * this.reg[regB];
                break;
            case 'ADD':
                this.reg[regA] = this.reg[regA] + this.reg[regB];
                break;
            case 'DIV':
                if (this.reg[regB] === 0) {
                    return 'ERROR';
                    break;
                }
                this.reg[regA] = this.reg[regA] / this.reg[regB];
                break;
            case 'AND':
                this.reg[regA] = this.reg[regA] && this.reg[regB];
                break;
            default:
                break;                
        }
    }

    /**
     * Advances the CPU one cycle
     */
    tick() {
        let IR;
        let operandA;
        let operandB;
        // Load the instruction register (IR--can just be a local variable here)
        // from the memory address pointed to by the PC. (I.e. the PC holds the
        // index into memory of the instruction that's about to be executed
        // right now.)

        // !!! IMPLEMENT ME
        IR = this.ram.read(this.reg.PC);
        // Debugging output
        //console.log(`${this.reg.PC}: ${IR.toString(2)}`);

        // Get the two bytes in memory _after_ the PC in case the instruction
        // needs them.

        // !!! IMPLEMENT ME

        // Execute the instruction. Perform the actions for the instruction as
        // outlined in the LS-8 spec.
       
        // !!! IMPLEMENT ME
        operandA = this.ram.read(this.reg.PC + 1);
        operandB = this.ram.read(this.reg.PC + 2);

        
        // Increment the PC register to go to the next instruction. Instructions
        // can be 1, 2, or 3 bytes long. Hint: the high 2 bits of the
        // instruction byte tells you how many bytes follow the instruction byte
        // for any particular instruction.
        switch(IR) {
            case ADD: 
                this.alu('ADD', operandA, operandB);
                break;
            case HLT:
                this.stopClock();
                break;
            case MUL:
                this.alu('MUL', operandA, operandB);
                break;
            case LDI:
                this.reg[operandA] = operandB;
                break;
            case PRN:
                console.log(this.reg[operandA]);
                break;

        }
        // !!! IMPLEMENT ME
        let operandCount = (IR >>> 6) & 0b11;
        let totalInstructionLen = operandCount + 1;
        this.reg.PC += totalInstructionLen;
    }
}

module.exports = CPU;
