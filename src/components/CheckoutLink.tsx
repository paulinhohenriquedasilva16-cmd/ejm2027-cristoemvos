import * as React from "react";
import type { CheckoutSource, TicketSkuId } from "@/lib/analytics/types";
import { trackCheckoutClick } from "@/lib/analytics";
import { buildCheckoutUrl } from "@/lib/checkout";

export interface CheckoutLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  source: CheckoutSource;
  ticketId?: TicketSkuId;
  accommodationName?: string;
  baseUrl?: string;
}

const CheckoutLink = React.forwardRef<HTMLAnchorElement, CheckoutLinkProps>(
  ({ source, ticketId = "geral", accommodationName, baseUrl, onClick, children, ...props }, ref) => {
    const [href, setHref] = React.useState(() => buildCheckoutUrl({ baseUrl }));

    React.useEffect(() => {
      const refresh = () => setHref(buildCheckoutUrl({ baseUrl }));
      refresh();
      window.addEventListener("ejm-attribution-updated", refresh);
      return () => window.removeEventListener("ejm-attribution-updated", refresh);
    }, [baseUrl]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      const latestUrl = buildCheckoutUrl({ baseUrl });
      e.currentTarget.href = latestUrl;
      trackCheckoutClick({
        source,
        ticketId,
        url: latestUrl,
        accommodationName,
      });
      onClick?.(e);
    };

    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-checkout-tracked="true"
        data-ticket-id={ticketId}
        data-checkout-source={source}
        onClick={handleClick}
        {...props}
      >
        {children}
      </a>
    );
  }
);

CheckoutLink.displayName = "CheckoutLink";

export default CheckoutLink;
