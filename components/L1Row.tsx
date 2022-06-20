import React, { Fragment, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ChevronDown, ChevronUp } from 'lucide-react';
import DetailsCard from './DetailsCard';
import RowName from './RowName';
import { formatUSD, formatPercent } from 'utils';
import { usePlausible } from 'next-plausible';

interface RowProps {
  protocol: any;
  total?: boolean;
  percent?: boolean;
}

const toggle = (isOpen: boolean) => !isOpen;

const cardHeight = 600;

const L1Row: React.FC<RowProps> = ({ protocol, total, percent }) => {
  const plausible = usePlausible();
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <div
        onClick={() => {
          setOpen(toggle);

          plausible(open ? 'close-details' : 'open-details', {
            props: {
              label: protocol.name,
            },
          });
        }}
        className={`item ${total || percent ? '' : 'app'} ${open ? 'open' : ''}`}
        style={{
          backgroundImage: protocol.metadata.icon ? `url('${protocol.metadata.icon}')` : undefined,
        }}
      >
        <div className="row-name">
          <RowName
            name={protocol.metadata.name}
            shortName={protocol.metadata.shortName}
            subtitle={protocol.metadata.subtitle}
          />
        </div>
        <div className="amount">
          {percent ? formatPercent(protocol.result) : formatUSD(protocol.result)}
        </div>
        <div className="arrow">{open ? <ChevronUp /> : <ChevronDown />}</div>
      </div>

      <CSSTransition in={open} timeout={500} unmountOnExit>
        <div className="details-container">
          {percent ? (
            <div>Amount of fees paid by rollups as a percentage of all fees paid on Ethereum.</div>
          ) : (
            <DetailsCard protocol={protocol} />
          )}
        </div>
      </CSSTransition>
      <style jsx>{`
        .item {
          display: flex;
          padding: 0 4px;
          background-color: #fff;
          font-size: 18px;
          background-repeat: no-repeat;
          background-position: 10px center;
          background-size: 20px 20px;
          padding-left: 10px;
          color: black;
          text-decoration: none;
          align-items: center;
          height: 54px;
          cursor: pointer;
        }
        .item:hover {
          background-color: #f5f5f5;
        }

        .item.app {
          background-color: #fad3f6;
        }
        .item.app:hover {
          background-color: #f8c3f3;
        }

        .row-name {
          flex: 1;
          display: flex;
          align-items: center;
        }

        .amount {
          padding-left: 32px;
          min-width: 160px;
          text-align: right;
          font-family: 'Noto Sans TC', sans-serif;
        }

        .arrow {
          padding: 0 4px;
          height: 24px;
          opacity: 0.7;
        }

        @keyframes slidein {
          from {
            max-height: 0px;
          }

          to {
            max-height: ${cardHeight}px;
          }
        }

        @keyframes slideout {
          from {
            max-height: ${cardHeight}px;
          }

          to {
            max-height: 0px;
          }
        }

        .details-container {
          max-height: ${cardHeight}px;
          animation: 0.5s 1 slidein;
          overflow: hidden;

          border-top: solid 1px #e3e3e3;
          border-bottom: solid 1px #e3e3e3;
          display: flex;
          flex-direction: column;
        }

        .details-container.exit {
          max-height: 0;
          animation: 0.5s 1 slideout;
        }

        @media (max-width: 700px) {
          .amount {
            font-size: 14px;
            min-width: 110px;
            padding-left: 8px;
          }

          .item {
            padding-left: 30px;
            background-position: 6px center;
          }

          .arrow {
            padding: 0 2px;
          }
        }
      `}</style>
    </Fragment>
  );
};

export default L1Row;
