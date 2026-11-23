import { I18N } from 'site-config';
import type { ButtonProps } from '@alfadormx/blocks/types/button';
import type { HeadlineProps } from '@alfadormx/blocks/types/headline';
import type { ItemProps } from '@alfadormx/blocks/types/item';
import type { NavigationTreeItem } from '@alfadormx/blocks/types/navigationtree';

type Language = (typeof I18N.languages)[number];
type ListingCopy = AstroBlocks.CopyRegistry['listing'];

/** Where "send my application" links point; `#` until the listing has a public address. */
export const EMAIL_HREF = '#';
export const GEO = { lat: 48.782727, lon: 2.227875 };
export const SERVICE_PUBLIC_URL = 'https://www.service-public.fr/particuliers/vosdroits/F1169';
export const ANCHORS = [
  'caracteristiques',
  'prix',
  'photos',
  'plan',
  'carte',
  'candidature',
  'faq',
] as const;

/** Text on the stone-900 band. */
export const ON_DARK = 'text-background';

/** Links on the dark band follow its text colour instead of the page's link colour. */
export const DARK_LINKS =
  '[--color-link:var(--color-background)] [--color-link-hover:var(--color-accent)]';

/** Small spaced capitals. */
export const TAGLINE = 'text-xs font-semibold uppercase tracking-[0.2em] text-primary';

/** Left-aligned section heading: spaced-caps tagline, serif title, muted lead. */
export const SECTION_HEADLINE: HeadlineProps = {
  align: 'left',
  class: 'mt-0 mb-10 space-y-3',
  taglineClass: TAGLINE,
  titleClass: 'text-4xl md:text-5xl leading-tight mb-0',
  subtitleClass: 'text-lg text-muted max-w-2xl',
};

/** Spaced-caps label above a serif value, as in the key facts and the price cards. */
export const LABEL = 'text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted';

/** White card with a hairline border, large radius and a soft shadow. */
export const CARD = 'bg-surface border border-border rounded-lg shadow-sm';

/** Small pill chip: a label styled as a Button, so it is taken out of the tab order and the accessibility tree's button role. */
export const CHIP: Partial<ButtonProps> = {
  tabindex: -1,
  role: 'presentation',
  shape: 'pill',
  size: 'xs',
  class: 'pointer-events-none px-3 font-semibold uppercase tracking-[0.12em]',
};

/** Solid terracotta pill. */
export const PILL: Partial<ButtonProps> = {
  variant: 'solid',
  intent: 'primary',
  shape: 'pill',
  class: 'font-semibold px-6',
};

/** Icon in a soft square, left of the label in the price rows and the characteristics. */
export const ICON_TILE = 'rounded-lg bg-elevated p-2 text-primary';

/** A price row: label and note on the left, amount on the right, hairline below. */
export const PRICE_ROW =
  'flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-border py-4 last:border-0';

export const PRICE_LABEL_ITEM: Partial<ItemProps> = {
  orientation: 'horizontal',
  class: 'flex-1 basis-56 items-center gap-4',
  mediaClass: 'size-10',
  icon: { class: ICON_TILE },
  titleClass: 'text-[1rem] font-semibold mb-0',
  textClass: 'text-sm text-muted mb-0',
};

export const PRICE_AMOUNT_ITEM: Partial<ItemProps> = {
  orientation: 'horizontal',
  class: 'ml-auto shrink-0',
  contentClass: 'items-end text-right',
  titleClass: 'text-[1rem] font-semibold whitespace-nowrap mb-0',
};

export function homeUrl(langCode: string): string {
  const lang = I18N.languages.find((l: Language) => l.code === langCode);
  return lang && lang.basePath !== '/' ? lang.basePath : '/';
}

export function anchorNav(nav: ListingCopy['nav']): NavigationTreeItem[] {
  return ANCHORS.map((id) => ({ label: nav.anchors[id], href: `#${id}` }));
}

/** Contact buttons stay disabled until `EMAIL_HREF` holds a real address. */
export const CONTACT_ACTION: Partial<ButtonProps> =
  EMAIL_HREF === '#' ? { disabled: true } : { href: EMAIL_HREF };

/** Markdown for the email link in the footer; muted text while there is no address. */
export function emailLink(label: string): string {
  return EMAIL_HREF === '#'
    ? `<span class="opacity-50 cursor-not-allowed" aria-disabled="true">${label}</span>`
    : `[${label}](${EMAIL_HREF})`;
}

/** Replaces the `{{email}}` placeholder that copy uses for the application address. */
export function withEmail(text: string): string {
  return text.replaceAll('{{email}}', EMAIL_HREF);
}
