# frozen_string_literal: true

module Views
  module Apartments
    class BannerComponent < ApplicationComponent
      attr_reader :apartment, :marker

      delegate :virtual_tour_url, :showcase, to: :apartment

      def initialize(apartment: nil, marker: nil)
        @apartment = apartment
        @marker = marker
      end

      def virtual_tour_index
        0
      end

      def photos_index
        virtual_tour_url.present? ? 1 : 0
      end

      def map_index
        virtual_tour_url.present? ? showcase.length + 1 : showcase.length
      end
    end
  end
end
