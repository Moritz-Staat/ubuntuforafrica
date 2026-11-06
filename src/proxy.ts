import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Doppelter Backslash: Mit nur einem fällt er im String weg, aus `\.` wird
  // `.`, und der Ausdruck schließt dann jeden Pfad mit mehr als einem Zeichen
  // aus. Dann bekam /kontakt ein 404 statt einer Weiterleitung auf /de/kontakt.
  matcher: ['/((?!api|_next|_vercel|studio|.*\\..*).*)']
};
