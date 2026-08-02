import portfolioData from '@/data/portfolio.json';
import type { PortfolioData } from '@/types/portfolio';

const data = portfolioData as PortfolioData;

/**
 * Single source of truth for all portfolio content.
 * Components must never hardcode names, dates, copy, or links —
 * everything is read from src/data/portfolio.json through this hook.
 */
export function usePortfolio(): PortfolioData {
  return data;
}
