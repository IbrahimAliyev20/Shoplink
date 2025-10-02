/**
 * Logger utility for development debugging
 * Automatically disabled in production to reduce bundle size and prevent data leaks
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  }

  debug(message: string, data?: unknown): void {
    if (!this.isDevelopment) return;
    
    const formattedMessage = this.formatMessage('debug', message);
    console.log(formattedMessage, data ?? '');
  }

  info(message: string, data?: unknown): void {
    if (!this.isDevelopment) return;
    
    const formattedMessage = this.formatMessage('info', message);
    console.info(formattedMessage, data ?? '');
  }

  warn(message: string, data?: unknown): void {
    const formattedMessage = this.formatMessage('warn', message);
    console.warn(formattedMessage, data ?? '');
  }

  error(message: string, error?: unknown): void {
    const formattedMessage = this.formatMessage('error', message);
    console.error(formattedMessage, error ?? '');
    
    // In production, you might want to send errors to a monitoring service
    // if (process.env.NODE_ENV === 'production') {
    //   sendToErrorMonitoring(message, error);
    // }
  }

  table(data: unknown): void {
    if (!this.isDevelopment) return;
    console.table(data);
  }
}

export const logger = new Logger();

